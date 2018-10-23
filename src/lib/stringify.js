export default  function stringify(object, indent = 2) {
  const string = JSON.stringify(object, null, indent)
  return string.replace(/"([^(")"]+)":/g,"$1:")
}
