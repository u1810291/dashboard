import { selectModelValue } from 'lib/loadable.selectors';
import { MerchantTags } from 'models/Merchant.model';
import { createSelector } from 'reselect';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { AnalyticsSliceNames, IAnalyticsStore, METRICS_STORE_KEY } from './Analytics.store';

export const selectMetricsStore: (state: any) => IAnalyticsStore = (state) => state[METRICS_STORE_KEY];

export const selectFilter = createSelector(
  selectMetricsStore,
  (store) => store[AnalyticsSliceNames.Filter],
);

export const selectChartStatisticsModel = createSelector(
  selectMetricsStore,
  (store) => store[AnalyticsSliceNames.Chart],
);

export const selectCountStatisticsModel = createSelector(
  selectMetricsStore,
  (store) => store[AnalyticsSliceNames.Statistics],
);

export const selectStatisticsByDate = createSelector(
  selectChartStatisticsModel,
  ({ value }) => value.byDate.map((item) => ({
    label: item.date,
    value: item.count,
  })),
);

export const selectVerificationsCount = createSelector(
  selectCountStatisticsModel,
  selectModelValue((countStatistics) => countStatistics?.statusStat),
);

export const selectDocumentsCount = createSelector(
  selectCountStatisticsModel,
  selectModelValue((countStatistics) => countStatistics?.documentTypeStat),
);

export const selectDevicesStatistics = createSelector(
  selectCountStatisticsModel,
  selectModelValue((countStatistics) => countStatistics?.deviceAndBrowserStat),
);

export const selectIpCheckStatistics = createSelector(
  selectMetricsStore,
  (store) => store[AnalyticsSliceNames.IpCheckStatistics],
);

export const selectMerchantCanUseSigmaWidget = createSelector(
  selectMerchantTags,
  (store) => store.includes(MerchantTags.UseSigmaAnalyticsWidget),
);
