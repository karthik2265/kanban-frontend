import { nanoid } from "nanoid";

function truncateText(str: string | null, count: number) {
  if (!str || str.length < count) return str;
  return str.substring(0, count) + "...";
}

function generateTemporaryId() {
  return `tempId-${nanoid()}`;
}

function sortByKey<T>(arr: T[], keyExtractor: (item: T) => number) {
  // Use the Array.prototype.sort() method with a custom comparator function
  arr.sort((a, b) => {
    const keyA = keyExtractor(a); // Get the key from object a
    const keyB = keyExtractor(b); // Get the key from object b

    if (keyA < keyB) {
      return -1; // a should come before b
    } else if (keyA > keyB) {
      return 1; // a should come after b
    } else {
      return 0; // a and b are equal
    }
  });

  return arr;
}

function findMaxByKey<T>(arr: T[] | null | undefined, keyExtractor: (item: T) => number) {
  if (!arr || arr.length === 0) { 
    return 0;
  }

  let maxItem = arr[0];
  let maxValue = keyExtractor(arr[0]);

  for (let i = 1; i < arr.length; i++) {
    const currentItem = arr[i];
    const currentValue = keyExtractor(currentItem);

    if (currentValue > maxValue) {
      maxItem = currentItem;
      maxValue = currentValue;
    }
  }

  return keyExtractor(maxItem);
}

export { truncateText, generateTemporaryId, sortByKey, findMaxByKey };
