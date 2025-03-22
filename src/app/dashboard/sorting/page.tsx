"use client"

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/DashboardLayout'
import { Play, Pause, RotateCcw } from 'lucide-react'

const generateArray = (size: number) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1)
}

export default function SortingPage() {
  const [array, setArray] = useState<number[]>([])
  const [arraySize, setArraySize] = useState(20)
  const [speed, setSpeed] = useState(50)
  const [isSorting, setIsSorting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [algorithm, setAlgorithm] = useState('bubble')

  useEffect(() => {
    setArray(generateArray(arraySize))
    setCurrentStep(0)
  }, [arraySize])

  const bubbleSort = async () => {
    const arr = [...array]
    const steps: number[][] = []
    
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          steps.push([...arr])
        }
      }
    }
    
    return steps
  }

  const handleSort = async () => {
    setIsSorting(true)
    const steps = await bubbleSort()
    
    for (let i = 0; i < steps.length; i++) {
      setArray(steps[i])
      setCurrentStep(i)
      await new Promise(resolve => setTimeout(resolve, speed))
    }
    
    setIsSorting(false)
  }

  const resetArray = () => {
    setArray(generateArray(arraySize))
    setCurrentStep(0)
    setIsSorting(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Sorting Visualizer</h1>
          <p className="mt-1 text-sm text-gray-500">
            Visualize different sorting algorithms in action
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="algorithm" className="block text-sm font-medium text-gray-700">
                Algorithm
              </label>
              <select
                id="algorithm"
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="bubble">Bubble Sort</option>
                <option value="quick">Quick Sort</option>
                <option value="merge">Merge Sort</option>
              </select>
            </div>

            <div>
              <label htmlFor="arraySize" className="block text-sm font-medium text-gray-700">
                Array Size
              </label>
              <input
                type="range"
                id="arraySize"
                min="5"
                max="50"
                value={arraySize}
                onChange={(e) => setArraySize(Number(e.target.value))}
                className="mt-1 block w-full"
              />
              <div className="text-sm text-gray-500 mt-1">{arraySize} elements</div>
            </div>

            <div>
              <label htmlFor="speed" className="block text-sm font-medium text-gray-700">
                Speed
              </label>
              <input
                type="range"
                id="speed"
                min="10"
                max="200"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="mt-1 block w-full"
              />
              <div className="text-sm text-gray-500 mt-1">{speed}ms</div>
            </div>

            <div className="flex items-end space-x-2">
              <button
                onClick={resetArray}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </button>
              <button
                onClick={handleSort}
                disabled={isSorting}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSorting ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="h-64 flex items-end justify-center space-x-1">
            {array.map((value, index) => (
              <div
                key={index}
                className="w-4 bg-indigo-500 rounded-t transition-all duration-100"
                style={{
                  height: `${(value / 100) * 100}%`,
                  backgroundColor: index === currentStep ? '#EF4444' : '#6366F1'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 