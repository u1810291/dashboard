// url search object -> json
import { dayEndTime, todayMomentZeroTime, zeroTime } from 'lib/date';
import { compact, identity, isString, pickBy } from 'lodash';
import moment from 'moment';
import { ITEMS_PER_PAGE } from 'models/Pagination.model';
import { REDUCE_DB_COUNT_CALLS } from './Release.model';

export const FilterRangeTypes = {
  All: 'All',
  Today: 'Today',
  Yesterday: 'Yesterday',
  Last7Days: 'Last7Days',
  Last30Days: 'Last30Days',
  LastWeek: 'LastWeek',
  LastMonth: 'LastMonth',
  LastYear: 'LastYear',
  ThisMonth: 'ThisMonth',
  ThisWeek: 'ThisWeek',
  ThisYear: 'ThisYear',
};

export const FilterRangesByLocal = {
  [FilterRangeTypes.All]:
    {
      id: FilterRangeTypes.All,
      getMomentPeriod: (registerDate) => ({
        start: moment(registerDate),
        end: moment().set(dayEndTime),
      }),
    },
  [FilterRangeTypes.Today]: {
    id: FilterRangeTypes.Today,
    getMomentPeriod: () => ({
      start: todayMomentZeroTime,
      end: moment().set(dayEndTime),
    }),
  },
  [FilterRangeTypes.Yesterday]: {
    id: FilterRangeTypes.Yesterday,
    getMomentPeriod: () => ({
      start: moment()
        .subtract(1, 'days')
        .set(zeroTime),
      end: moment()
        .subtract(1, 'days')
        .set(dayEndTime),
    }),
  },
  [FilterRangeTypes.Last7Days]:
    {
      id: FilterRangeTypes.Last7Days,
      getMomentPeriod: () => ({
        start: moment()
          .subtract(7, 'days')
          .set(zeroTime),
        end: moment().set(dayEndTime),
      }),
    },
  [FilterRangeTypes.Last30Days]: {
    id: FilterRangeTypes.Last30Days,
    getMomentPeriod: () => ({
      start: moment()
        .subtract(30, 'days')
        .set(zeroTime),
      end: moment().set(dayEndTime),
    }),
  },
  [FilterRangeTypes.LastWeek]: {
    id: FilterRangeTypes.LastWeek,
    getMomentPeriod: () => {
      const start = moment()
        .startOf('week')
        .subtract(1, 'week');
      const end = moment(start)
        .endOf('week');
      return {
        start,
        end,
      };
    },
  },
  [FilterRangeTypes.LastMonth]: {
    id: FilterRangeTypes.LastMonth,
    getMomentPeriod: () => {
      const start = moment()
        .startOf('month')
        .subtract(1, 'month');
      const end = moment(start)
        .endOf('month');
      return {
        start,
        end,
      };
    },
  },
  [FilterRangeTypes.LastYear]:
    {
      id: FilterRangeTypes.LastYear,
      getMomentPeriod: () => {
        const start = moment()
          .startOf('year')
          .subtract(1, 'year');
        const end = moment(start)
          .endOf('year');
        return {
          start,
          end,
        };
      },
    },
  [FilterRangeTypes.ThisMonth]:
    {
      id: FilterRangeTypes.ThisMonth,
      getMomentPeriod: () => ({
        start: moment()
          .startOf('month'),
        end: moment().set(dayEndTime),
      }),
    },
  [FilterRangeTypes.ThisWeek]:
    {
      id: FilterRangeTypes.ThisWeek,
      getMomentPeriod: () => ({
        start: moment()
          .startOf('week'),
        end: moment().set(dayEndTime),
      }),
    },
  [FilterRangeTypes.ThisYear]:
    {
      id: FilterRangeTypes.ThisYear,
      getMomentPeriod: () => ({
        start: moment()
          .startOf('year'),
        end: moment().set(dayEndTime),
      }),
    },
};

export const allDatePickerRanges = [
  FilterRangesByLocal[FilterRangeTypes.All],
  FilterRangesByLocal[FilterRangeTypes.Today],
  FilterRangesByLocal[FilterRangeTypes.Yesterday],
  FilterRangesByLocal[FilterRangeTypes.Last7Days],
  FilterRangesByLocal[FilterRangeTypes.Last30Days],
  FilterRangesByLocal[FilterRangeTypes.LastWeek],
  FilterRangesByLocal[FilterRangeTypes.LastMonth],
  FilterRangesByLocal[FilterRangeTypes.LastYear],
  FilterRangesByLocal[FilterRangeTypes.ThisMonth],
  FilterRangesByLocal[FilterRangeTypes.ThisWeek],
  FilterRangesByLocal[FilterRangeTypes.ThisYear],
];

if (REDUCE_DB_COUNT_CALLS) {
  [FilterRangeTypes.All, FilterRangeTypes.LastYear, FilterRangeTypes.ThisYear].forEach((f) => {
    allDatePickerRanges.splice(allDatePickerRanges.indexOf(FilterRangesByLocal[f]), 1);
    delete FilterRangesByLocal[f];
    delete FilterRangeTypes[f];
  });
}

export const analyticsDatePickerRanges = [
  FilterRangesByLocal[FilterRangeTypes.Today],
  FilterRangesByLocal[FilterRangeTypes.Yesterday],
  FilterRangesByLocal[FilterRangeTypes.Last7Days],
  FilterRangesByLocal[FilterRangeTypes.Last30Days],
  FilterRangesByLocal[FilterRangeTypes.LastWeek],
  FilterRangesByLocal[FilterRangeTypes.LastMonth],
  FilterRangesByLocal[FilterRangeTypes.ThisMonth],
  FilterRangesByLocal[FilterRangeTypes.ThisWeek],
];

export function identifyRange(startDate, endDate, registerDate, allRanges) {
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);
  const startEndMomentRange = startMoment.diff(endMoment, 'days');
  const foundRange = allRanges.find((rangeItem) => {
    const { start, end } = rangeItem.getMomentPeriod(registerDate);
    const startEndItemRange = start.diff(end, 'days');
    return startMoment.isSame(start) && startEndMomentRange === startEndItemRange;
  });
  return foundRange?.id || null;
}

export function filterParse({ search = '', status = '', flowIds = '', countries = '', updatedBy = '', eventType = '', asMerchantId, offset, sortOrder, sortBy, ...values }, filterStructure) {
  const stringTypeGuard = (value) => (isString(value) ? compact(value.split(',')) : []);

  return {
    ...(filterStructure.search && { search }),
    ...(filterStructure.status && { status: stringTypeGuard(status) }),
    ...(filterStructure.flowIds && { flowIds: stringTypeGuard(flowIds) }),
    ...(filterStructure.countries && { countries: stringTypeGuard(countries) }),
    ...(filterStructure.offset && { offset: +offset || 0 }),
    ...(filterStructure.limit && { limit: ITEMS_PER_PAGE }),
    ...(filterStructure.pageSize && { pageSize: ITEMS_PER_PAGE }),
    ...(filterStructure.sortOrder && { sortOrder: sortOrder || null }),
    ...(filterStructure.sortBy && { sortBy: sortBy || null }),
    ...(filterStructure.updatedBy && { updatedBy: stringTypeGuard(updatedBy) }),
    ...(filterStructure.eventType && { eventType: stringTypeGuard(eventType) }),
    ...(filterStructure['dateCreated[start]'] && {
      'dateCreated[start]': values['dateCreated[start]']
        ? moment(values['dateCreated[start]'])
        : null,
    }),
    ...(filterStructure['dateCreated[end]'] && {
      'dateCreated[end]': values['dateCreated[end]']
        ? moment(values['dateCreated[end]'])
        : null,
    }),
    // For Customer Support
    ...(filterStructure.asMerchantId && { asMerchantId }),
  };
}

// json -> url search object
export function filterSerialize(filter) {
  const { status, flowIds, countries, updatedBy, eventType, ...serialized } = filter;
  serialized.status = status?.join(',');
  serialized.flowIds = flowIds?.join(',');
  serialized.countries = countries?.join(',');
  serialized.updatedBy = updatedBy?.join(',');
  serialized.eventType = eventType?.join(',');

  if (serialized['dateCreated[start]']) {
    serialized['dateCreated[start]'] = serialized['dateCreated[start]'].toJSON();
  }
  if (serialized['dateCreated[end]']) {
    serialized['dateCreated[end]'] = serialized['dateCreated[end]'].toJSON();
  }

  return pickBy(serialized, identity);
}

export function parseFromURL(url, filterStructure) {
  const fromURL = Object.fromEntries(new URLSearchParams(url));
  return filterParse(fromURL, filterStructure);
}

export function getFilterDatesIsValid(filter) {
  return filter['dateCreated[start]'] && filter['dateCreated[end]'];
}

export const initDateFilter = {
  'dateCreated[start]': null,
  'dateCreated[end]': null,
};

const defaultInitDateFilterPeriod = FilterRangesByLocal[FilterRangeTypes.Last7Days].getMomentPeriod();
export const lastSevenDaysFilter = {
  'dateCreated[start]': defaultInitDateFilterPeriod.start,
  'dateCreated[end]': defaultInitDateFilterPeriod.end,
};

export const RangeParts = {
  Start: 'start',
  End: 'end',
};

export const RangeSlices = {
  From: 'from',
  To: 'to',
};
