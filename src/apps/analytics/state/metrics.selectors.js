import { METRICS_STORE_KEY, SliceNames } from 'apps/analytics/state/metrics.store';
import { createSelector } from 'reselect';

export const selectMetricsStore = (state) => state[METRICS_STORE_KEY];

export const selectFilter = createSelector(
  selectMetricsStore,
  (store) => store[SliceNames.Filter],
);

export const selectMetrics = createSelector(
  selectMetricsStore,
  (store) => store[SliceNames.Metrics],
);

export const selectStatistics = createSelector(
  selectMetricsStore,
  (store) => store[SliceNames.Statistics],
);

export const selectStatisticsByDate = createSelector(
  selectStatistics,
  ({ value }) => value.byDate.map((item) => ({
    label: item.date,
    value: item.count,
  })));

export const selectVerificationsCount = createSelector(
  selectMetricsStore,
  (store) => store[SliceNames.VerificationsCount],
);

export const selectDocumentsCount = createSelector(
  selectMetricsStore,
  (store) => store[SliceNames.DocumentsCount],
);

export const selectDevicesStatistics = createSelector(
  selectMetricsStore,
  (store) => store[SliceNames.DevicesStatistics],
);

export const selectIpCheckStatistics = createSelector(
  selectMetricsStore,
  (store) => store[SliceNames.IpCheckStatistics],
);
