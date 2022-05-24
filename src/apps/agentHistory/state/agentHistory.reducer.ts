import { createReducer } from 'state/store.utils';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { agentHistoryCleanFilter } from '../models/AgentHistory.model';
import { AgentHistoryActionGroupTypes, IAgentHistoryStore, SliceNameTypes, types } from './agentHistory.store';

const initialState: IAgentHistoryStore = {
  [SliceNameTypes.Filter]: agentHistoryCleanFilter,
  [SliceNameTypes.History]: LoadableAdapter.createState(null),
  [SliceNameTypes.Count]: 0,
};

export const agentHistoryReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(AgentHistoryActionGroupTypes.History, SliceNameTypes.History),
  [types.FILTER_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNameTypes.Filter]: payload,
    };
  },
  [types.AGENT_HISTORY_COUNT_LOAD](state, { payload }) {
    return {
      ...state,
      [SliceNameTypes.Count]: payload,
    };
  },
});
