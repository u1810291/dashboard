import { Loadable, LoadableModelSelector, LoadableSelector, LoadableValueSelector } from '../models/Loadable.model';

export function selectLoadableValue(selector: LoadableSelector): LoadableModelSelector {
  return (model, ...args) => ({
    ...model,
    value: selector(model.value, ...args),
  });
}

export function selectModelValue<T = any>(selector?: LoadableSelector): LoadableValueSelector<T> {
  return (model: Loadable<any>, ...args) => (selector
    ? selector(model.value, ...args)
    : model.value);
}
