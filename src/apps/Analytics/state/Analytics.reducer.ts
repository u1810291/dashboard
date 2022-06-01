import { LoadableAdapter } from 'lib/Loadable.adapter';
import { analyticsCleanFilter } from 'models/Analytics.model';
import { createReducer } from 'state/store.utils';
import { metricsActionTypes } from './Analytics.actions';
import { AnalyticsActionGroups, AnalyticsSliceNames } from './Analytics.store';

const initialState = {
  [AnalyticsSliceNames.Chart]: LoadableAdapter.createState({
    byCountry: [
      // {
      //   count: number,
      //   documentCountry: Locale
      // }
    ],
    byHour: [
      // {
      //   count: number,
      //   hour: string (!)
      // }
    ],
    byDayOfWeek: [
      // {
      //   count: number,
      //   dayOfWeek: string (!)
      // }
    ],
    byDate: [
      // {
      //   count: number,
      //   date: Date
      // }
    ],
  }),
  [AnalyticsSliceNames.Statistics]: LoadableAdapter.createState({
    countStats: {
      all: 0,
      verified: 0,
      rejected: 0,
    },
    documentTypeStats: {
      passport: 0,
      'national-id': 0,
      'driving-license': 0,
      'proof-of-residency': 0,
    },
    deviceAndBrowserStat: {
      devices: [],
      browsers: [],
    },
  }),
  [AnalyticsSliceNames.IpCheckStatistics]: LoadableAdapter.createState([]),
  filter: analyticsCleanFilter,
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(AnalyticsActionGroups.Chart, AnalyticsSliceNames.Chart),
  ...LoadableAdapter.createHandlers(AnalyticsActionGroups.Filter, AnalyticsSliceNames.Filter),
  ...LoadableAdapter.createHandlers(AnalyticsActionGroups.Statistics, AnalyticsSliceNames.Statistics),
  ...LoadableAdapter.createHandlers(AnalyticsActionGroups.IpCheckStatistics, AnalyticsSliceNames.IpCheckStatistics),
  [metricsActionTypes.FILTER_UPDATE](state, { payload }) {
    return {
      ...state,
      filter: payload,
    };
  },
});
