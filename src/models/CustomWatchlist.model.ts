export enum CustomWatchlistSeverityOnMatchTypes {
  NoAction = 'no-action',
  Low = 'low',
  Medium = 'medium',
  Critical = 'critical',
}

export interface IFlowWatchlist {
  id: number;
  severityOnMatch: CustomWatchlistSeverityOnMatchTypes;
}
