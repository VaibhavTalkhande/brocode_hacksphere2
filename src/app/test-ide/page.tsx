"use client"

import React, { useEffect } from 'react';
import { VisualizationCanvas } from '@/components/Visualization/VisualizationCanvas';
import { VisualizationControls } from '@/components/Visualization/VisualizationControls';
import { CodeEditor } from '@/components/CodeEditor/CodeEditor';
import { useVisualizationStore } from '@/store/visualizationStore';

export default function Page() {
  const { setData, currentAlgorithm } = useVisualizationStore();

  useEffect(() => {
    // Generate sample data and visualize
    const sampleArray = Array.from({ length: 10 }, () => 
      Math.floor(Math.random() * 50) + 1
    );
    
    if (currentAlgorithm?.execute) {
      const steps = currentAlgorithm.execute(sampleArray);
      setData(steps);
    }
  }, [currentAlgorithm, setData]);

  return (
    <div className="min-h-screen bg-white">
     

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <h2 className="text-lg font-semibold mb-4 text-black">Algorithm Visualization</h2>
              <VisualizationCanvas />
              <div className="mt-4">
                <VisualizationControls />
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md text-black">
              <CodeEditor />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}