export function isFeatureEnabled(feature) {
  let varName = 'REACT_APP_' + feature
  return process.env[varName]
}