import { Algorithm, AlgorithmCategory } from "@/types/algorithm";
import { Language } from "@/types/language";

export const mergeSortAlgorithm: Algorithm = {
  id: "merge-sort",
  name: "Merge Sort",
  category: AlgorithmCategory.SORTING,
  complexity: {
    time: "O(n log n)",
    space: "O(n)",
  },
  selectedLanguage: Language.JAVASCRIPT,
  implementations: {
    [Language.JAVASCRIPT]: `function mergeSort(arr) {
  const steps = [[...arr]];
  
  function merge(left, right, startIdx) {
    const result = [];
    let i = 0;
    let j = 0;
    
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
    
    while (i < left.length) {
      result.push(left[i]);
      i++;
    }
    
    while (j < right.length) {
      result.push(right[j]);
      j++;
    }
    
    // Create a snapshot of the current state
    const currentArray = [...arr];
    for (let k = 0; k < result.length; k++) {
      currentArray[startIdx + k] = result[k];
      steps.push([...currentArray]);
    }
    
    return result;
  }
  
  function mergeSortHelper(array, startIdx = 0) {
    if (array.length <= 1) return array;
    
    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);
    
    return merge(
      mergeSortHelper(left, startIdx),
      mergeSortHelper(right, startIdx + mid),
      startIdx
    );
  }
  
  mergeSortHelper([...arr], 0);
  return steps;
}`,
    [Language.PYTHON]: `def merge_sort(arr):
    steps = [arr[:]]
    
    def merge(left, right, start_idx):
        result = []
        i = j = 0
        
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1
        
        result.extend(left[i:])
        result.extend(right[j:])
        
        # Create snapshot
        current_array = arr[:]
        for k, val in enumerate(result):
            current_array[start_idx + k] = val
            steps.append(current_array[:])
        
        return result
    
    def merge_sort_helper(array, start_idx=0):
        if len(array) <= 1:
            return array
        
        mid = len(array) // 2
        left = array[:mid]
        right = array[mid:]
        
        return merge(
            merge_sort_helper(left, start_idx),
            merge_sort_helper(right, start_idx + mid),
            start_idx
        )
    
    merge_sort_helper(arr[:], 0)
    return steps`,
    [Language.JAVA]: `public class MergeSort {
    private static List<int[]> steps;
    
    public static List<int[]> mergeSort(int[] arr) {
        steps = new ArrayList<>();
        steps.add(arr.clone());
        
        mergeSortHelper(arr, 0, arr.length - 1);
        return steps;
    }
    
    private static void merge(int[] arr, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;
        
        int[] L = new int[n1];
        int[] R = new int[n2];
        
        for (int i = 0; i < n1; ++i)
            L[i] = arr[l + i];
        for (int j = 0; j < n2; ++j)
            R[j] = arr[m + 1 + j];
            
        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
            steps.add(arr.clone());
        }
        
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
            steps.add(arr.clone());
        }
        
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
            steps.add(arr.clone());
        }
    }
    
    private static void mergeSortHelper(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            
            mergeSortHelper(arr, l, m);
            mergeSortHelper(arr, m + 1, r);
            
            merge(arr, l, m, r);
        }
    }
}`,
    [Language.CPP]: `class MergeSort {
    vector<vector<int>> steps;
    
    void merge(vector<int>& arr, int l, int m, int r) {
        vector<int> left(arr.begin() + l, arr.begin() + m + 1);
        vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
        
        int i = 0, j = 0, k = l;
        while (i < left.size() && j < right.size()) {
            if (left[i] <= right[j]) {
                arr[k] = left[i++];
            } else {
                arr[k] = right[j++];
            }
            k++;
            steps.push_back(arr);
        }
        
        while (i < left.size()) {
            arr[k++] = left[i++];
            steps.push_back(arr);
        }
        
        while (j < right.size()) {
            arr[k++] = right[j++];
            steps.push_back(arr);
        }
    }
    
    void mergeSortHelper(vector<int>& arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            
            mergeSortHelper(arr, l, m);
            mergeSortHelper(arr, m + 1, r);
            
            merge(arr, l, m, r);
        }
    }
    
public:
    vector<vector<int>> mergeSort(vector<int> arr) {
        steps.clear();
        steps.push_back(arr);
        
        mergeSortHelper(arr, 0, arr.size() - 1);
        return steps;
    }
};`,
  },
  execute: (input: number[]): number[][] => {
    const steps: number[][] = [[...input]];

    function merge(
      left: number[],
      right: number[],
      startIdx: number
    ): number[] {
      const result: number[] = [];
      let i = 0;
      let j = 0;

      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }

      while (i < left.length) {
        result.push(left[i]);
        i++;
      }

      while (j < right.length) {
        result.push(right[j]);
        j++;
      }

      // Create a snapshot of the current state
      const currentArray = [...input];
      for (let k = 0; k < result.length; k++) {
        currentArray[startIdx + k] = result[k];
        steps.push([...currentArray]);
      }

      return result;
    }

    function mergeSortHelper(array: number[], startIdx = 0): number[] {
      if (array.length <= 1) return array;

      const mid = Math.floor(array.length / 2);
      const left = array.slice(0, mid);
      const right = array.slice(mid);

      return merge(
        mergeSortHelper(left, startIdx),
        mergeSortHelper(right, startIdx + mid),
        startIdx
      );
    }

    mergeSortHelper([...input], 0);
    return steps;
  },
};
