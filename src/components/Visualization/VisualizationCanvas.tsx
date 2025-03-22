"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useVisualizationStore } from '../../store/visualizationStore';

export const VisualizationCanvas: React.FC = () => {
  const { data, currentStep } = useVisualizationStore();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;
    if (!data[currentStep]) {
      setError('No data available for the current step');
      return;
    }
    setError(null);

    // Cleanup function to handle component unmount or data updates
    const cleanup = () => {
      if (svgRef.current) {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();
      }
    };

    try {
      const margin = { top: 40, right: 20, bottom: 50, left: 60 };
      const width = containerRef.current.clientWidth - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Clear previous content
      cleanup();

      const svg = d3.select(svgRef.current);
      const g = svg
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const currentData = data[currentStep].map((value, index) => ({ index, value }));

      // Scales with padding
      const x = d3.scaleBand()
        .range([0, width])
        .domain(currentData.map(d => d.index.toString()))
        .padding(0.2);

      const maxValue = d3.max(currentData, d => d.value) || 0;
      const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, maxValue * 1.1]); // Add 10% padding to top

      // Color scale for gradient with fixed domain for consistency
      const colorScale = d3.scaleSequential()
        .domain([0, 1000]) // Use fixed domain for consistent colors
        .interpolator(d3.interpolateInferno);

      // Add X axis with animation
      const xAxis = g.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`);
      
      xAxis.call(d3.axisBottom(x))
        .selectAll('text')
        .attr('class', 'text-sm fill-gray-400')
        .style('text-anchor', 'middle');

      // Add Y axis with animation
      const yAxis = g.append('g')
        .attr('class', 'y-axis');
      
      yAxis.call(d3.axisLeft(y))
        .selectAll('text')
        .attr('class', 'text-sm fill-gray-400');

      // Add bars with animation
      const bars = g.selectAll('rect')
        .data(currentData)
        .enter()
        .append('rect')
        .attr('x', d => x(d.index.toString()) || 0)
        .attr('y', height)
        .attr('width', x.bandwidth())
        .attr('height', 0)
        .attr('fill', d => colorScale(d.value / maxValue)) // Normalize value for consistent colors
        .attr('rx', 4)
        .attr('ry', 4);

      // Animate bars with smoother transition
      bars.transition()
        .duration(250) // Faster transition
        .ease(d3.easeCubicOut) // Smoother easing
        .attr('y', d => y(d.value))
        .attr('height', d => height - y(d.value));

      // Add value labels with animation
      const labels = g.selectAll('.value-label')
        .data(currentData)
        .enter()
        .append('text')
        .attr('class', 'value-label text-sm fill-gray-300')
        .attr('x', d => (x(d.index.toString()) || 0) + x.bandwidth() / 2)
        .attr('y', height)
        .attr('text-anchor', 'middle')
        .text(d => d.value);

      // Animate labels with smoother transition
      labels.transition()
        .duration(250) // Faster transition
        .ease(d3.easeCubicOut) // Smoother easing
        .attr('y', d => y(d.value) - 5);

      // Add axis labels
      g.append('text')
        .attr('class', 'fill-gray-400 text-sm')
        .attr('text-anchor', 'middle')
        .attr('x', width / 2)
        .attr('y', height + 40)
        .text('Index');

      g.append('text')
        .attr('class', 'fill-gray-400 text-sm')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -40)
        .text('Value');

    } catch (err) {
      console.error('Error updating visualization:', err);
      setError('Error updating visualization');
      cleanup();
    }

    // Cleanup on unmount or data update
    return cleanup;
  }, [data, currentStep]);

  return (
    <div className="space-y-4">
      <div ref={containerRef} className="relative w-full h-[400px] bg-gray-900 rounded-lg shadow-md overflow-hidden p-4">
        {error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-400">{error}</p>
          </div>
        ) : data[currentStep]?.length > 0 ? (
          <svg ref={svgRef} className="w-full h-full" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">No data to visualize. Run the code to see the visualization.</p>
          </div>
        )}
      </div>
      
      <div className="bg-gray-900 p-4 rounded-lg shadow-md">
        <h3 className="font-medium mb-2 text-gray-200">Current State:</h3>
        <div className="grid grid-cols-10 gap-2">
          {data[currentStep]?.map((value, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-2 bg-gray-800 rounded text-gray-200"
              style={{
                background: `linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)`,
              }}
            >
              {value}
            </div>
          )) || (
            <div className="col-span-10 text-center text-gray-400">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};