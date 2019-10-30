export function localeNumber(value, defaultValue = 0) {
  return (+value || defaultValue).toLocaleString();
}

/**
 * @param num number
 * @return Array
 */
export function countToArray(num) {
  return Array(num).fill(null).map((item, index) => index);
}
