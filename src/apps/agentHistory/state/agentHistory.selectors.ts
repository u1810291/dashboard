import { Serializable } from 'lib/object';
import { filterSerialize } from 'models/Filter.model';
import { Loadable } from 'models/Loadable.model';
import { createSelector } from 'reselect';
import { selectModelValue } from 'lib/loadable.selectors';
import { AGENT_HISTORY_STORE_KEY, AgentHistoryStore, SliceNames } from './agentHistory.store';
import { AgentHistoryEvent, AgentHistoryFilter } from '../models/AgentHistory.model';

export const selectAgentHistoryStore = (state) => state[AGENT_HISTORY_STORE_KEY];

export const selectAgentHistoryFilter = createSelector<any, AgentHistoryStore, AgentHistoryFilter>(
  selectAgentHistoryStore,
  (store) => store[SliceNames.Filter],
);

export const selectAgentHistoryFilterSerialized = createSelector<any, AgentHistoryStore, Serializable<AgentHistoryFilter>>(
  selectAgentHistoryStore,
  (store) => filterSerialize(store[SliceNames.Filter]),
);

export const selectAgentHistoryTotalCount = createSelector<any, AgentHistoryStore, number>(
  selectAgentHistoryStore,
  (store) => store[SliceNames.Count],
);

export const selectAgentHistoryModel = createSelector<any, AgentHistoryStore, Loadable<AgentHistoryEvent[]>>(
  selectAgentHistoryStore,
  (store) => store[SliceNames.History],
);

export const selectAgentHistoryEventsList = createSelector<any, Loadable<AgentHistoryEvent[]>, AgentHistoryEvent[]>(
  selectAgentHistoryModel,
  selectModelValue((history) => history),
);

export const selectAgentHistoryLoadedCount = createSelector<any, AgentHistoryEvent[], number>(
  selectAgentHistoryEventsList,
  (list) => list?.length,
);
