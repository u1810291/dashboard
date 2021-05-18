import { createReducer } from 'state/utils';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { verificationHistoryCleanFilter } from 'models/History.model';
import { SliceNames, types, VerificationHistoryActionGroups } from './verificationHistory.store';

const initialState = {
  filter: verificationHistoryCleanFilter,
  [SliceNames.Changes]: LoadableAdapter.createState(null),
  [SliceNames.Count]: 0,
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(VerificationHistoryActionGroups.VERIFICATION_CHANGES, SliceNames.Changes),
  [types.FILTER_UPDATE](state, { payload }) {
    return {
      ...state,
      filter: payload,
    };
  },
  [types.VERIFICATION_HISTORY_COUNT_LOAD](state, { payload }) {
    return {
      ...state,
      [SliceNames.Count]: payload,
    };
  },

});
