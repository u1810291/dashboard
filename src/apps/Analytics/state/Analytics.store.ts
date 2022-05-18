import { IChart, IStatistics, IFilter } from 'models/Analytics.model';
import { Loadable } from 'models/Loadable.model';

export const METRICS_STORE_KEY = 'analytics';

export enum AnalyticsActionGroups {
  Chart = 'CHART',
  Statistics = 'STATISTICS',
  IpCheckStatistics = 'IP_CHECK_STATISTICS',
  Filter = 'FILTER',
}

export enum AnalyticsSliceNames {
  Statistics = 'statistics',
  Chart = 'chart',
  Filter = 'filter',
  IpCheckStatistics = 'ipCheckStatistics',
}

export interface IAnalyticsStore {
  [AnalyticsSliceNames.Chart]: Loadable<IChart>;
  [AnalyticsSliceNames.Statistics]: Loadable<IStatistics>;
  [AnalyticsSliceNames.Filter]: IFilter;
  [AnalyticsSliceNames.IpCheckStatistics]: Loadable<any[]>;
}
