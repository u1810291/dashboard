export default function stringify(object, indent = 2, isWithQuotes = false) {
  if (!object) {
    return '';
  }
  const result = JSON.stringify(object, null, indent);
  return isWithQuotes ? result : result.replace(/"([^(")"]+)":/g, '$1:');
}
