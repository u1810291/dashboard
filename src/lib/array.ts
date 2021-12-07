export function checkIfArrayIncludesArrayableValue<T>(arr: T[], arrayable: T[] | T) {
  if (Array.isArray(arrayable)) {
    return arrayable.every((item) => arr?.includes(item));
  }
  return arr?.includes(arrayable as T);
}
