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

  static createHandlers(actionGroupName, sliceName) {
    return {
      [`${actionGroupName}_${ActionSubTypes.Request}`](state) {
        return {
          ...state,
          [sliceName]: LoadableAdapter.request(state[sliceName]),
        };
      },
      [`${actionGroupName}_${ActionSubTypes.Success}`](state, { payload }) {
        return {
          ...state,
          [sliceName]: LoadableAdapter.success(payload, state[sliceName]),
        };
      },

      [`${actionGroupName}_${ActionSubTypes.Failure}`](state, { error }) {
        return {
          ...state,
          [sliceName]: LoadableAdapter.failure(error, state[sliceName]),
        };
      },
    };
  }

  static request(state) {
    return {
      ...state,
      isLoaded: false,
      isLoading: true,
      isFailed: false,
      error: null,
    };
  }

  static success(data, state) {
    return {
      ...state,
      value: {
        ...state.value,
        ...data,
      },
      isLoaded: true,
      isLoading: false,
    };
  }

  static failure(error, state) {
    return {
      ...state,
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
}
