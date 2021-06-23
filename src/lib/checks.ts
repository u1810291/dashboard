const emptyValues = [null, undefined];

export function isEmpty(value: any): boolean {
  return emptyValues.includes(value);
}
