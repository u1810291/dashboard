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
      [`${actionGroupName}_${ActionSubTypes.Success}`](state, { payload }) {
        return {
          ...state,
          [sliceName]: LoadableCollectionAdapter.success(payload, state[sliceName]),
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

  static success(data, state) {
    return {
      ...state,
      value: [
        ...state.value,
        ...data,
      ],
      isLoaded: true,
      isLoading: false,
    };
  }
}
