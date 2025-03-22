import { Language } from './language';

export interface Algorithm {
  id: string;
  name: string;
  category: AlgorithmCategory;
  complexity: {
    time: string;
    space: string;
  };
  implementations: Record<Language, string>;
  selectedLanguage: Language;
  output?: string;
  execute: (input: number[]) => number[][];
}

export enum AlgorithmCategory {
  SORTING = 'SORTING',
  SEARCHING = 'SEARCHING',
  GRAPH = 'GRAPH',
  TREE = 'TREE',
  ARRAY = 'ARRAY',
  LINKEDLIST = 'LINKEDLIST',
}

export interface VisualizationState {
  currentStep: number;
  totalSteps: number;
  speed: number;
  isPlaying: boolean;
  data: number[][];
}