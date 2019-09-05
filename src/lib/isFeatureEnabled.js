export default function isFeatureEnabled(feature) {
  const varName = `REACT_APP_${feature}`;
  return process.env[varName];
}
