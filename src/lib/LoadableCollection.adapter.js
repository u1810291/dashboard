import { LoadableAdapter } from 'lib/Loadable.adapter';
import { ActionSubTypes } from 'state/utils';

export class LoadableCollectionAdapter extends LoadableAdapter {
  static createHandlers(actionGroupName, sliceName) {
    return {
      [`${actionGroupName}_${ActionSubTypes.Request}`](state) {
        return {
          ...state,
          [sliceName]: LoadableCollectionAdapter.request(state[sliceName]),
        };
      },
      [`${actionGroupName}_${ActionSubTypes.Success}`](state, { payload, isReset }) {
        return {
          ...state,
          [sliceName]: LoadableCollectionAdapter.success(payload, state[sliceName], isReset),
        };
      },
      [`${actionGroupName}_${ActionSubTypes.Updating}`](state, { payload }) {
        return {
          ...state,
          [sliceName]: LoadableCollectionAdapter.request(state[sliceName], payload, true),
        };
      },
      [`${actionGroupName}_${ActionSubTypes.Failure}`](state, { error }) {
        return {
          ...state,
          [sliceName]: LoadableCollectionAdapter.failure(error, state[sliceName]),
        };
      },
    };
  }

  static success(data, state, isReset = false) {
    return {
      ...state,
      value: isReset ? data : [
        ...state.value,
        ...data,
      ],
      isLoaded: true,
      isLoading: false,
    };
  }
}
