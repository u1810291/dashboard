export function round(value: number | string, decimals: number | string): number {
  return Number(`${Math.round(Number(`${value}e${decimals}`))}e-${decimals}`);
}
