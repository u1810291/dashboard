import { Serializable } from 'lib/object';
import { filterSerialize } from 'models/Filter.model';
import { Loadable } from 'models/Loadable.model';
import { createSelector } from 'reselect';
import { selectModelValue } from 'lib/loadable.selectors';
import { AGENT_HISTORY_STORE_KEY, IAgentHistoryStore, SliceNameTypes } from './agentHistory.store';
import { IAgentHistoryEvent, AgentHistoryFilter } from '../models/AgentHistory.model';

export const selectAgentHistoryStore = (state) => state[AGENT_HISTORY_STORE_KEY];

export const selectAgentHistoryFilter = createSelector<any, IAgentHistoryStore, AgentHistoryFilter>(
  selectAgentHistoryStore,
  (store) => store[SliceNameTypes.Filter],
);

export const selectAgentHistoryFilterSerialized = createSelector<any, IAgentHistoryStore, Serializable<AgentHistoryFilter>>(
  selectAgentHistoryStore,
  (store) => filterSerialize(store[SliceNameTypes.Filter]),
);

export const selectAgentHistoryTotalCount = createSelector<any, IAgentHistoryStore, number>(
  selectAgentHistoryStore,
  (store) => store[SliceNameTypes.Count],
);

export const selectAgentHistoryModel = createSelector<any, IAgentHistoryStore, Loadable<IAgentHistoryEvent[]>>(
  selectAgentHistoryStore,
  (store) => store[SliceNameTypes.History],
);

export const selectAgentHistoryEventsList = createSelector<any, Loadable<IAgentHistoryEvent[]>, IAgentHistoryEvent[]>(
  selectAgentHistoryModel,
  selectModelValue((history) => history),
);

export const selectAgentHistoryLoadedCount = createSelector<any, IAgentHistoryEvent[], number>(
  selectAgentHistoryEventsList,
  (list) => list?.length,
);
