import { create } from 'zustand';
import { VisualizationState, Algorithm } from '../types/algorithm';
import { bubbleSortAlgorithm } from '../lib/bubbleSort';
import { mergeSortAlgorithm } from '../lib/mergeSort';
import { Language } from '../types/language';

interface VisualizationStore extends VisualizationState {
  currentAlgorithm: Algorithm | null;
  algorithms: Algorithm[];
  setCurrentStep: (step: number) => void;
  setSpeed: (speed: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setData: (data: number[][]) => void;
  setCurrentAlgorithm: (algorithm: Algorithm) => void;
  setLanguage: (language: Language) => void;
  runCode: (arraySize?: number, maxValue?: number, customArray?: number[]) => void;
  reset: () => void;
}

const algorithms = [
  bubbleSortAlgorithm,
  mergeSortAlgorithm
];

const initialState: VisualizationState & { 
  currentAlgorithm: Algorithm | null,
  algorithms: Algorithm[]
} = {
  currentStep: 0,
  totalSteps: 0,
  speed: 1,
  isPlaying: false,
  data: [],
  currentAlgorithm: mergeSortAlgorithm,
  algorithms
};

let visualizationInterval: number | null = null;

export const useVisualizationStore = create<VisualizationStore>((set, get) => ({
  ...initialState,
  setCurrentStep: (step) => set({ currentStep: step }),
  setSpeed: (speed) => set({ speed }),
  setIsPlaying: (isPlaying) => {
    const { speed } = get();
    
    if (visualizationInterval) {
      clearInterval(visualizationInterval);
      visualizationInterval = null;
    }

    if (isPlaying) {
      visualizationInterval = setInterval(() => {
        const { currentStep, totalSteps } = get();
        if (currentStep < totalSteps - 1) {
          set(state => ({ currentStep: state.currentStep + 1 }));
        } else {
          if (visualizationInterval) {
            clearInterval(visualizationInterval);
            visualizationInterval = null;
          }
          set({ isPlaying: false });
        }
      }, 1000 / speed) as unknown as number;
    }

    set({ isPlaying });
  },
  setData: (data) => set({ data, totalSteps: data.length }),
  setCurrentAlgorithm: (algorithm) => set({ currentAlgorithm: algorithm }),
  setLanguage: (language: Language) => {
    const { currentAlgorithm } = get();
    if (currentAlgorithm) {
      set({
        currentAlgorithm: {
          ...currentAlgorithm,
          selectedLanguage: language
        }
      });
    }
  },
  runCode: (arraySize = 10, maxValue = 50, customArray?: number[]) => {
    const { currentAlgorithm, setIsPlaying } = get();
    if (!currentAlgorithm) {
      console.error('No algorithm selected');
      return;
    }

    // Clear any existing visualization
    if (visualizationInterval) {
      clearInterval(visualizationInterval);
      visualizationInterval = null;
    }

    // Reset state before running new code
    set(state => ({
      ...state,
      currentStep: 0,
      totalSteps: 0,
      isPlaying: false,
      data: []
    }));

    try {
      // Handle input array
      let inputArray: number[];
      if (customArray) {
        // Validate custom array
        if (!Array.isArray(customArray) || customArray.length === 0) {
          throw new Error('Invalid input: Array is empty or not an array');
        }
        if (customArray.length > 100) {
          throw new Error('Array size cannot exceed 100 elements');
        }
        if (customArray.some(num => typeof num !== 'number' || num < 1 || num > 1000)) {
          throw new Error('All values must be numbers between 1 and 1000');
        }
        inputArray = [...customArray]; // Create a copy
      } else {
        // Generate random array
        inputArray = Array.from({ length: arraySize }, () => 
          Math.floor(Math.random() * maxValue) + 1
        );
      }

      console.log('Input array:', inputArray);

      // Execute algorithm
      const startTime = performance.now();
      const result = currentAlgorithm.execute([...inputArray]); // Create another copy for execution
      const endTime = performance.now();
      const executionTime = (endTime - startTime).toFixed(2);

      console.log('Algorithm steps:', result);

      // Validate result
      if (!Array.isArray(result) || result.length === 0) {
        throw new Error('Invalid result: Function must return an array of steps');
      }

      // Validate each step has the correct format
      const isValidStep = result.every(step => 
        Array.isArray(step) && 
        step.length === inputArray.length &&
        step.every(num => typeof num === 'number' && num >= 1 && num <= 1000)
      );

      if (!isValidStep) {
        throw new Error('Invalid step format: Each step must be an array of valid numbers');
      }
      
      // Update state with new data
      set(state => ({
        ...state,
        currentAlgorithm: {
          ...currentAlgorithm,
          output: `Input: [${inputArray.join(', ')}]\nOutput: [${result[result.length - 1]?.join(', ')}]\nExecution Time: ${executionTime}ms\nSteps: ${result.length}`,
        },
        data: result,
        currentStep: 0,
        totalSteps: result.length,
        isPlaying: false
      }));

      // Start visualization after a small delay
      setTimeout(() => {
        setIsPlaying(true);
      }, 100);
    } catch (error) {
      console.error('Algorithm execution error:', error);
      set(state => ({
        ...state,
        currentAlgorithm: {
          ...currentAlgorithm,
          output: `Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`,
        },
        data: [],
        currentStep: 0,
        totalSteps: 0,
        isPlaying: false
      }));
    }
  },
  reset: () => {
    if (visualizationInterval) {
      clearInterval(visualizationInterval);
      visualizationInterval = null;
    }
    set(initialState);
  },
}));