import { ERROR_COMMON } from 'models/Error.model';
import { Loadable } from 'models/Loadable.model';
import { ActionSubTypes } from 'state/store.utils';

export class LoadableAdapter {
  static createState<T>(value: T): Loadable<T> {
    return {
      value,
      isLoaded: false,
      isLoading: false,
      isFailed: false,
      error: null,
    };
  }

  // provide support to work with state directly without any slices
  static applyAction(state, sliceName, action, ...args) {
    return !sliceName
      ? action(state, ...args)
      : {
        ...state,
        [sliceName]: action(state[sliceName], ...args),
      };
  }

  static createHandlers(actionGroupName, sliceName) {
    return {
      [`${actionGroupName}_${ActionSubTypes.Request}`](state) {
        return LoadableAdapter.applyAction(state, sliceName, LoadableAdapter.request);
      },
      [`${actionGroupName}_${ActionSubTypes.Success}`](state, { payload, isReset = false }) {
        return LoadableAdapter.applyAction(state, sliceName, LoadableAdapter.success, payload, isReset);
      },
      [`${actionGroupName}_${ActionSubTypes.Updating}`](state, { payload }) {
        return LoadableAdapter.applyAction(state, sliceName, LoadableAdapter.request, payload, true);
      },
      [`${actionGroupName}_${ActionSubTypes.Failure}`](state, { error }) {
        return LoadableAdapter.applyAction(state, sliceName, LoadableAdapter.failure, error);
      },
      [`${actionGroupName}_${ActionSubTypes.Clear}`](state, { payload }) {
        return LoadableAdapter.applyAction(state, sliceName, LoadableAdapter.clear, payload);
      },
    };
  }

  static applyValue(value, newValue, isReset = false) {
    if (isReset) {
      return newValue;
    }

    if (Array.isArray(value) || Array.isArray(newValue)) {
      return [
        ...value,
        ...newValue,
      ];
    }

    if (typeof value === 'object' || typeof newValue === 'object') {
      return {
        ...value,
        ...newValue,
      };
    }

    return newValue;
  }

  static request<T>(model: Loadable<T>, payload: T, isUpdating = false): Loadable<T> {
    return {
      isLoaded: isUpdating ? model.isLoaded : false,
      isLoading: true,
      isFailed: false,
      error: null,
      value: !payload ? model.value : LoadableAdapter.applyValue(model.value, payload),
    };
  }

  static success<T>(model: Loadable<T>, payload: T, isReset: boolean): Loadable<T> {
    return {
      ...model,
      value: LoadableAdapter.applyValue(model.value, payload, isReset),
      isLoaded: true,
      isLoading: false,
    };
  }

  static failure<T>(model: Loadable<T>, error): Loadable<T> {
    return {
      ...model,
      isLoading: false,
      isFailed: true,
      error: error || ERROR_COMMON,
    };
  }

  static clear<T>(model: Loadable<T>, payload: T): Loadable<T> {
    return LoadableAdapter.createState(payload);
  }

  static isPristine(model: Loadable<any>): boolean {
    return !model.isLoaded && !model.isLoading && !model.isFailed;
  }
}
