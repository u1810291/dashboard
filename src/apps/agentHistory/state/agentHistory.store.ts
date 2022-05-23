import { Loadable } from 'models/Loadable.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';
import { IAgentHistoryEvent, AgentHistoryFilter } from '../models/AgentHistory.model';

export const AGENT_HISTORY_STORE_KEY = 'agentHistory';

export enum AgentHistoryActionGroupTypes {
  History = 'AGENT_HISTORY',
}

export enum SliceNameTypes {
  History = 'history',
  Count = 'count',
  Filter = 'filter',
}

export interface IAgentHistoryStore {
  [SliceNameTypes.Filter]: AgentHistoryFilter;
  [SliceNameTypes.History]: Loadable<IAgentHistoryEvent[]>;
  [SliceNameTypes.Count]: number;
}

export const types: TypesSequence = {
  FILTER_UPDATE: 'agent/FILTER_UPDATE',
  AGENT_HISTORY_COUNT_LOAD: 'AGENT_HISTORY_COUNT_LOAD',
  ...createTypesSequence(AgentHistoryActionGroupTypes.History),
};
