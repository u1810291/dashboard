import { createReducer } from 'state/utils';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { agentHistoryCleanFilter } from 'models/History.model';
import { agentHistoryActionGroups, SliceNames, types } from './agentHistory.store';

const initialState = {
  [SliceNames.Filter]: agentHistoryCleanFilter,
  [SliceNames.History]: LoadableAdapter.createState(null),
  [SliceNames.Count]: 0,
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(agentHistoryActionGroups.History, SliceNames.History),
  [types.FILTER_UPDATE](state, { payload }) {
    return {
      ...state,
      filter: payload,
    };
  },
  [types.AGENT_HISTORY_COUNT_LOAD](state, { payload }) {
    return {
      ...state,
      [SliceNames.Count]: payload,
    };
  },
});