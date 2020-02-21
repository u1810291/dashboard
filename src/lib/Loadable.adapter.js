import { ERROR_COMMON } from 'models/Error.model';
import { ActionSubTypes } from 'state/utils';

export class LoadableAdapter {
  static createState(value) {
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
    };
  }

  static applyValue(value, newValue, isReset) {
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

  static request(model, payload, isUpdating = false) {
    return {
      isLoaded: isUpdating ? model.isLoaded : false,
      isLoading: true,
      isFailed: false,
      error: null,
      value: !payload ? model.value : LoadableAdapter.applyValue(model.value, payload),
    };
  }

  static success(model, payload, isReset) {
    return {
      ...model,
      value: LoadableAdapter.applyValue(model.value, payload, isReset),
      isLoaded: true,
      isLoading: false,
    };
  }

  static failure(model, error) {
    return {
      ...model,
      isLoading: false,
      isFailed: true,
      error: error || ERROR_COMMON,
    };
  }

  /**
   * @deprecated
   */
  static get(state) {
    return [
      state.value,
      state.isLoading,
      state.isLoaded,
      state.isFailed,
      state.error,
    ];
  }

  static isPristine(model) {
    return !model.isLoaded && !model.isLoading && !model.isFailed;
  }
}
