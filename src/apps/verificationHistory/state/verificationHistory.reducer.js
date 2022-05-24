import { createReducer } from 'state/store.utils';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { verificationHistoryCleanFilter } from 'models/History.model';
import { SliceNameTypes, types, VerificationHistoryActionGroups } from './verificationHistory.store';

const initialState = {
  filter: verificationHistoryCleanFilter,
  [SliceNameTypes.Changes]: LoadableAdapter.createState(null),
  [SliceNameTypes.Count]: 0,
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(VerificationHistoryActionGroups.VERIFICATION_CHANGES, SliceNameTypes.Changes),
  [types.FILTER_UPDATE](state, { payload }) {
    return {
      ...state,
      filter: payload,
    };
  },
  [types.VERIFICATION_HISTORY_COUNT_LOAD](state, { payload }) {
    return {
      ...state,
      [SliceNameTypes.Count]: payload,
    };
  },

});
