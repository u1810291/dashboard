export function localeNumber(value, defaultValue = 0) {
  return (+value || defaultValue).toLocaleString();
}
