import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/utils';
import { metricsActionGroups, SliceNames } from './metrics.store';

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
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(metricsActionGroups.Metrics, SliceNames.Metrics),
  ...LoadableAdapter.createHandlers(metricsActionGroups.Statistics, SliceNames.Statistics),
});
