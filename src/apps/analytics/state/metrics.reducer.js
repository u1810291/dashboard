import { metricsActionTypes } from 'apps/analytics/state/metrics.actions';
import { metricsActionGroups, SliceNames } from 'apps/analytics/state/metrics.store';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { analyticsCleanFilter } from 'models/Analytics.model';
import { createReducer } from 'state/utils';

const initialState = {
  [SliceNames.Metrics]: LoadableAdapter.createState({
    currentMonth: 0,
    currentWeek: 0,
    days30: 0,
    today: 0,
    total: 0,
  }),
  [SliceNames.Statistics]: LoadableAdapter.createState({
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
  [SliceNames.VerificationsCount]: LoadableAdapter.createState({
    all: 0,
    verified: 0,
    rejected: 0,
  }),
  [SliceNames.DocumentsCount]: LoadableAdapter.createState({
    passport: 0,
    'national-id': 0,
    'driving-license': 0,
    'proof-of-residency': 0,
  }),
  [SliceNames.DevicesStatistics]: LoadableAdapter.createState({
    devices: [],
    browsers: [],
  }),
  [SliceNames.IpCheckStatistics]: LoadableAdapter.createState([]),
  filter: analyticsCleanFilter,
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(metricsActionGroups.Metrics, SliceNames.Metrics),
  ...LoadableAdapter.createHandlers(metricsActionGroups.Statistics, SliceNames.Statistics),
  ...LoadableAdapter.createHandlers(metricsActionGroups.Filter, SliceNames.Filter),
  ...LoadableAdapter.createHandlers(metricsActionGroups.VerificationsCount, SliceNames.VerificationsCount),
  ...LoadableAdapter.createHandlers(metricsActionGroups.DocumentsCount, SliceNames.DocumentsCount),
  ...LoadableAdapter.createHandlers(metricsActionGroups.DevicesStatistics, SliceNames.DevicesStatistics),
  ...LoadableAdapter.createHandlers(metricsActionGroups.IpCheckStatistics, SliceNames.IpCheckStatistics),
  [metricsActionTypes.FILTER_UPDATE](state, { payload }) {
    return {
      ...state,
      filter: payload,
    };
  },
});
