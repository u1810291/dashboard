import { ERROR_COMMON } from 'lib/error.model';
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
      [`${actionGroupName}_${ActionSubTypes.Success}`](state, { payload }) {
        return LoadableAdapter.applyAction(state, sliceName, LoadableAdapter.success, payload);
      },
      [`${actionGroupName}_${ActionSubTypes.Updating}`](state, { payload }) {
        return LoadableAdapter.applyAction(state, sliceName, LoadableAdapter.request, payload, true);
      },
      [`${actionGroupName}_${ActionSubTypes.Failure}`](state, { error }) {
        return LoadableAdapter.applyAction(state, sliceName, LoadableAdapter.failure, error);
      },
    };
  }

  static request(model, payload, isUpdating = false) {
    return {
      isLoaded: isUpdating ? model.isLoaded : false,
      isLoading: true,
      isFailed: false,
      error: null,
      value: !payload ? model.value : {
        ...model.value,
        ...payload,
      },
    };
  }

  static success(model, data) {
    return {
      ...model,
      value: {
        ...model.value,
        ...data,
      },
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
