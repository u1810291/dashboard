export function selectLoadableValue(selector) {
  return (model, ...args) => ({
    ...model,
    value: selector(model.value, ...args),
  });
}

export function selectModelValue(selector) {
  return (model) => (selector ? selector(model.value) : model.value);
}
