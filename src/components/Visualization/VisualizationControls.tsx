"use client"

import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RefreshCw } from 'lucide-react';
import { useVisualizationStore } from '../../store/visualizationStore';

export const VisualizationControls: React.FC = () => {
  const { 
    isPlaying, 
    currentStep, 
    totalSteps, 
    speed,
    setIsPlaying, 
    setCurrentStep,
    setSpeed 
  } = useVisualizationStore();

  return (
    <div className="flex items-center justify-center space-x-4 p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
      <button
        onClick={() => setCurrentStep(0)}
        className="p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-300"
      >
        <SkipBack className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-300"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>
      
      <button
        onClick={() => setCurrentStep(Math.min(currentStep + 1, totalSteps - 1))}
        className="p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-300"
      >
        <SkipForward className="w-5 h-5" />
      </button>
      
      <div className="flex items-center space-x-2">
        <RefreshCw className="w-4 h-4 text-gray-300" />
        <input
          type="range"
          min="0.25"
          max="2"
          step="0.25"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-24"
        />
        <span className="text-sm text-gray-300">{speed}x</span>
      </div>
    </div>
  );
};