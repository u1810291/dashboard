export default function parse(jsonString, fallback = {}) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return fallback;
  }
}
