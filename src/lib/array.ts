export function isArrayIncludesArrayableValue<T>(arr: T[], arrayable: T[] | T) {
  if (Array.isArray(arrayable)) {
    return arrayable.every((item) => arr?.includes(item));
  }
  return arr?.includes(arrayable as T);
}

// Use this function for toggle primitive value in array
//
// Example:
// const [watchlistChecked, setWatchlistChecked] = useState([1, 2, 3]);
// setWatchlistChecked((prev) => getTogglePrimitiveInArray(prev, watchlistId));
export const getTogglePrimitiveInArray = <T>(prev: T[], value: T): T[] => {
  if (prev.includes(value as T)) {
    return prev.filter((currentWatchlistId) => currentWatchlistId !== value);
  }

  return [...prev, value];
};
