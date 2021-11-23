import { createReducer } from 'state/store.utils';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { agentHistoryCleanFilter } from '../models/AgentHistory.model';
import { agentHistoryActionGroups, AgentHistoryStore, SliceNames, types } from './agentHistory.store';

const initialState: AgentHistoryStore = {
  [SliceNames.Filter]: agentHistoryCleanFilter,
  [SliceNames.History]: LoadableAdapter.createState(null),
  [SliceNames.Count]: 0,
};

export const agentHistoryReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(agentHistoryActionGroups.History, SliceNames.History),
  [types.FILTER_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNames.Filter]: payload,
    };
  },
  [types.AGENT_HISTORY_COUNT_LOAD](state, { payload }) {
    return {
      ...state,
      [SliceNames.Count]: payload,
    };
  },
});
