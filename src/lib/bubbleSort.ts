import { Algorithm, AlgorithmCategory } from '@/types/algorithm';
import { Language } from '@/types/language';

export const bubbleSortAlgorithm: Algorithm = {
  id: 'bubble-sort',
  name: 'Bubble Sort',
  category: AlgorithmCategory.SORTING,
  complexity: {
    time: 'O(n²)',
    space: 'O(1)',
  },
  selectedLanguage: Language.JAVASCRIPT,
  implementations: {
    [Language.JAVASCRIPT]: `function bubbleSort(arr) {
  const steps = [[...arr]];
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push([...arr]);
      }
    }
  }
  
  return steps;
}`,
    [Language.PYTHON]: `def bubble_sort(arr):
    steps = [arr[:]]
    n = len(arr)
    
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                steps.append(arr[:])
    
    return steps`,
    [Language.JAVA]: `public class BubbleSort {
    public static List<int[]> bubbleSort(int[] arr) {
        List<int[]> steps = new ArrayList<>();
        steps.add(arr.clone());
        
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    steps.add(arr.clone());
                }
            }
        }
        
        return steps;
    }
}`,
    [Language.CPP]: `vector<vector<int>> bubbleSort(vector<int> arr) {
    vector<vector<int>> steps;
    steps.push_back(arr);
    
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                steps.push_back(arr);
            }
        }
    }
    
    return steps;
}`
  },
  execute: (input: number[]): number[][] => {
    const arr = [...input];
    const steps: number[][] = [[...arr]];
    
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push([...arr]);
        }
      }
    }
    
    return steps;
  }
};