import { Serializable } from 'lib/object';
import { filterSerialize } from 'models/Filter.model';
import { Loadable } from 'models/Loadable.model';
import { createSelector } from 'reselect';
import { selectModelValue } from 'lib/loadable.selectors';
import { AGENT_HISTORY_STORE_KEY, IAgentHistoryStore, SliceNameTypes } from './agentHistory.store';
import { IAgentHistoryEvent, AgentHistoryFilter } from '../models/AgentHistory.model';

export const selectAgentHistoryStore = (state: { AGENT_HISTORY_STORE_KEY: IAgentHistoryStore }): IAgentHistoryStore => state[AGENT_HISTORY_STORE_KEY];

export const selectAgentHistoryFilter = createSelector<[typeof selectAgentHistoryStore], AgentHistoryFilter>(
  selectAgentHistoryStore,
  (store) => store[SliceNameTypes.Filter],
);

export const selectAgentHistoryFilterSerialized = createSelector<[typeof selectAgentHistoryStore], Serializable<AgentHistoryFilter>>(
  selectAgentHistoryStore,
  (store) => filterSerialize(store[SliceNameTypes.Filter]),
);

export const selectAgentHistoryTotalCount = createSelector<[typeof selectAgentHistoryStore], number>(
  selectAgentHistoryStore,
  (store) => store[SliceNameTypes.Count],
);

export const selectAgentHistoryModel = createSelector<[typeof selectAgentHistoryStore], Loadable<IAgentHistoryEvent[]>>(
  selectAgentHistoryStore,
  (store) => store[SliceNameTypes.History],
);

export const selectAgentHistoryEventsList = createSelector<[typeof selectAgentHistoryModel], IAgentHistoryEvent[]>(
  selectAgentHistoryModel,
  selectModelValue((history) => history),
);

export const selectAgentHistoryLoadedCount = createSelector<[typeof selectAgentHistoryEventsList], number>(
  selectAgentHistoryEventsList,
  (list) => list?.length,
);
