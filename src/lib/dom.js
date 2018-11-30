export function cssVariable(variable, element = document.body) {
  return window.getComputedStyle(element).getPropertyValue(variable)
}
