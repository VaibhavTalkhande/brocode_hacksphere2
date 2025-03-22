"use client"
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RefreshCw } from 'lucide-react';
import { useVisualizationStore } from '@/store/visualizationStore';
import { Language, languageNames } from '../../types/language';

export const CodeEditor: React.FC = () => {
  const { currentAlgorithm, setCurrentAlgorithm, runCode, algorithms, setLanguage } = useVisualizationStore();
  const [arraySize, setArraySize] = useState<number>(10);
  const [maxValue, setMaxValue] = useState<number>(50);
  const [customArray, setCustomArray] = useState<string>('');
  const [useCustomArray, setUseCustomArray] = useState<boolean>(false);

  const handleEditorChange = (value: string | undefined) => {
    if (value && currentAlgorithm) {
      setCurrentAlgorithm({
        ...currentAlgorithm,
        implementations: {
          ...currentAlgorithm.implementations,
          [currentAlgorithm.selectedLanguage]: value
        }
      });
    }
  };

  const handleRunCode = () => {
    if (!currentAlgorithm) {
      console.error('No algorithm selected');
      return;
    }

    if (useCustomArray) {
      try {
        // Clean and parse the input string
        const parsedArray = customArray
          .split(',')
          .map(num => num.trim())
          .filter(num => num !== '')
          .map(num => {
            const parsed = parseInt(num);
            if (isNaN(parsed)) {
              throw new Error(`Invalid number: ${num}`);
            }
            return parsed;
          });

        if (parsedArray.length === 0) {
          throw new Error('Please enter valid numbers separated by commas');
        }

        if (parsedArray.length > 100) {
          throw new Error('Array size cannot exceed 100 elements');
        }

        // Validate values
        const invalidValue = parsedArray.find(num => num < 1 || num > 1000);
        if (invalidValue !== undefined) {
          throw new Error(`Values must be between 1 and 1000. Found: ${invalidValue}`);
        }

        console.log('Running algorithm with custom array:', parsedArray);
        setCurrentAlgorithm({
          ...currentAlgorithm,
          output: `Processing array: [${parsedArray.join(', ')}]`
        });
        runCode(undefined, undefined, parsedArray);
      } catch (error) {
        console.error('Invalid input array:', error);
        setCurrentAlgorithm({
          ...currentAlgorithm,
          output: `Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`
        });
      }
    } else {
      if (arraySize < 1 || arraySize > 100) {
        setCurrentAlgorithm({
          ...currentAlgorithm,
          output: 'Error: Array size must be between 1 and 100'
        });
        return;
      }

      if (maxValue < 1 || maxValue > 1000) {
        setCurrentAlgorithm({
          ...currentAlgorithm,
          output: 'Error: Max value must be between 1 and 1000'
        });
        return;
      }

      console.log('Running algorithm with random array:', { arraySize, maxValue });
      runCode(arraySize, maxValue);
    }
  };

  const handleGenerateRandom = () => {
    setUseCustomArray(false);
    setCustomArray('');
  };

  const handleCustomArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomArray(value);
    
    // Only validate if there's actual input
    if (!value.trim()) {
      if (currentAlgorithm) {
        setCurrentAlgorithm({
          ...currentAlgorithm,
          output: 'Enter comma-separated numbers (e.g., 5, 2, 8, 1, 9)'
        });
      }
      return;
    }
    
    // Validate and parse input in real-time
    try {
      const parsedArray = value
        .split(',')
        .map(num => num.trim())
        .filter(num => num !== '')
        .map(num => {
          const parsed = parseInt(num);
          if (isNaN(parsed)) {
            throw new Error(`Invalid number: ${num}`);
          }
          if (parsed < 1 || parsed > 1000) {
            throw new Error(`Value must be between 1 and 1000: ${parsed}`);
          }
          return parsed;
        });
      
      if (parsedArray.length > 100) {
        throw new Error('Array size cannot exceed 100 elements');
      }
      
      if (parsedArray.length > 0 && currentAlgorithm) {
        setCurrentAlgorithm({
          ...currentAlgorithm,
          output: `Valid input array: [${parsedArray.join(', ')}]\nLength: ${parsedArray.length}`
        });
      }
    } catch (error) {
      if (currentAlgorithm) {
        setCurrentAlgorithm({
          ...currentAlgorithm,
          output: `Warning: ${error instanceof Error ? error.message : 'An unknown error occurred'}`
        });
      }
    }
  };

  const handleCustomArrayKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Run the algorithm when Enter is pressed
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRunCode();
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-100">Code Editor</h3>
          <div className="flex gap-2">
            <select
              className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-200"
              value={currentAlgorithm?.id}
              onChange={(e) => {
                const selected = algorithms.find(algo => algo.id === e.target.value);
                if (selected) setCurrentAlgorithm(selected);
              }}
            >
              {algorithms.map(algo => (
                <option key={algo.id} value={algo.id}>
                  {algo.name} - {algo.complexity.time}
                </option>
              ))}
            </select>
            <select
              className="block w-40 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-200"
              value={currentAlgorithm?.selectedLanguage}
              onChange={(e) => setLanguage(e.target.value as Language)}
            >
              {Object.entries(languageNames).map(([key, name]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {useCustomArray ? (
            <div className="space-y-2 flex-grow">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-300">Custom Array (comma-separated)</label>
                <button
                  onClick={handleGenerateRandom}
                  className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Use Random
                </button>
              </div>
              <input
                type="text"
                value={customArray}
                onChange={handleCustomArrayChange}
                onKeyDown={handleCustomArrayKeyDown}
                placeholder="e.g., 5, 2, 8, 1, 9"
                className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-200"
                aria-label="Enter comma-separated numbers"
              />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Array Size</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={arraySize}
                  onChange={(e) => setArraySize(Math.max(1, parseInt(e.target.value) || 1))}
                  className="block w-24 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-200"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Max Value</label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={maxValue}
                  onChange={(e) => setMaxValue(Math.max(1, parseInt(e.target.value) || 1))}
                  className="block w-24 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-200"
                />
              </div>
              <button
                onClick={() => setUseCustomArray(true)}
                className="text-sm text-indigo-400 hover:text-indigo-300 mt-6"
              >
                Use Custom Array
              </button>
            </>
          )}
          <button
            onClick={handleRunCode}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors mt-6"
          >
            <Play className="w-4 h-4" />
            Run Code
          </button>
        </div>
      </div>
      <div className="h-[400px] bg-gray-800 rounded border border-gray-700 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          language={currentAlgorithm?.selectedLanguage || 'javascript'}
          theme="vs-dark"
          value={currentAlgorithm?.implementations[currentAlgorithm.selectedLanguage] || '// Select an algorithm or write your own code'}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true
          }}
        />
      </div>
      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
          <h4 className="font-medium mb-2 text-gray-200">Time Complexity:</h4>
          <p className="font-mono text-sm text-gray-300">{currentAlgorithm?.complexity.time}</p>
          <h4 className="font-medium mb-2 mt-4 text-gray-200">Space Complexity:</h4>
          <p className="font-mono text-sm text-gray-300">{currentAlgorithm?.complexity.space}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
          <h4 className="font-medium mb-2 text-gray-200">Output:</h4>
          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300">
            {currentAlgorithm?.output || 'No output yet. Click "Run Code" to execute.'}
          </pre>
        </div>
      </div>
    </div>
  );
};