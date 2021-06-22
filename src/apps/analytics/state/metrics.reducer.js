import { metricsActionTypes } from 'apps/analytics/state/metrics.actions';
import { metricsActionGroups, SliceNames } from 'apps/analytics/state/metrics.store';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { analyticsCleanFilter } from 'models/Analytics.model';
import { createReducer } from 'state/store.utils';

const initialState = {
  [SliceNames.Chart]: LoadableAdapter.createState({
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
  [SliceNames.Statistics]: LoadableAdapter.createState({
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
    deviceAndBrowserStats: {
      devices: [],
      browsers: [],
    },
  }),
  [SliceNames.IpCheckStatistics]: LoadableAdapter.createState([]),
  filter: analyticsCleanFilter,
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(metricsActionGroups.Chart, SliceNames.Chart),
  ...LoadableAdapter.createHandlers(metricsActionGroups.Filter, SliceNames.Filter),
  ...LoadableAdapter.createHandlers(metricsActionGroups.Statistics, SliceNames.Statistics),
  ...LoadableAdapter.createHandlers(metricsActionGroups.IpCheckStatistics, SliceNames.IpCheckStatistics),
  [metricsActionTypes.FILTER_UPDATE](state, { payload }) {
    return {
      ...state,
      filter: payload,
    };
  },
});
