import { Loadable, LoadableModelSelector, LoadableSelector, LoadableValueSelector } from '../models/Loadable.model';

export function selectLoadableValue(selector: LoadableSelector): LoadableModelSelector {
  return (model, ...args) => ({
    ...model,
    value: selector(model.value, ...args),
  });
}

export function selectModelValue(selector?: LoadableSelector): LoadableValueSelector {
  return (model: Loadable<any>, ...args) => (selector
    ? selector(model.value, ...args)
    : model.value);
}
