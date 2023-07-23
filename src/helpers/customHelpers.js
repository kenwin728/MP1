// Custom helper to merge two arrays into an array of objects
export function mergeArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      throw new Error('Arrays must have the same length for merging.');
    }
  
    const mergedArray = arr1.map((elem, index) => {
      return {
        Reply: elem,
        User: arr2[index]
      };
    });
  
    return mergedArray;
  }
