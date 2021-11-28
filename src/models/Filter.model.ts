// url search object -> json
import { dayEndTime, zeroTime } from 'lib/date';
import { Serializable } from 'lib/object';
import { compact, identity, isString, pickBy } from 'lodash';
import { ITEMS_PER_PAGE } from 'models/Pagination.model';
import dayjs from 'dayjs';

export enum FilterRangeTypes {
  All = 'All',
  Today = 'Today',
  Yesterday = 'Yesterday',
  Last7Days = 'Last7Days',
  Last30Days = 'Last30Days',
  LastWeek = 'LastWeek',
  LastMonth = 'LastMonth',
  LastYear = 'LastYear',
  ThisMonth = 'ThisMonth',
  ThisWeek = 'ThisWeek',
  ThisYear = 'ThisYear',
}

export type FilterDateParams = {
  'dateCreated[start]': Date | null;
  'dateCreated[end]': Date | null;
}

export type FilterRange = {
  id: FilterRangeTypes;
  getDateRange: (startDate?: string) => {
    start: Date;
    end: Date;
  };
}

export interface FilterI {
  eventType?: string[];
  pageSize?: number;
  'dateCreated[start]'?: any; // TODO: @ggrigorev add type after merge DIO-735: Replace Moment with DayJS
  'dateCreated[end]'?: any;
  [key: string]: any;
}

export const FilterRangesByLocal: Record<FilterRangeTypes, FilterRange> = {
  [FilterRangeTypes.All]:
    {
      id: FilterRangeTypes.All,
      getDateRange: (registerDate: string) => ({
        start: dayjs(registerDate).toDate(),
        end: dayjs().set(dayEndTime).toDate(),
      }),
    },
  [FilterRangeTypes.Today]: {
    id: FilterRangeTypes.Today,
    getDateRange: () => ({
      start: dayjs().startOf('day').toDate(),
      end: dayjs().set(dayEndTime).toDate(),
    }),
  },
  [FilterRangeTypes.Yesterday]: {
    id: FilterRangeTypes.Yesterday,
    getDateRange: () => ({
      start: dayjs()
        .subtract(1, 'days')
        .startOf('day').toDate(),
      end: dayjs()
        .subtract(1, 'days')
        .set(dayEndTime).toDate(),
    }),
  },
  [FilterRangeTypes.Last7Days]:
    {
      id: FilterRangeTypes.Last7Days,
      getDateRange: () => ({
        start: dayjs()
          .subtract(7, 'days')
          .set(zeroTime)
          .toDate(),
        end: dayjs().set(dayEndTime).toDate(),
      }),
    },
  [FilterRangeTypes.Last30Days]: {
    id: FilterRangeTypes.Last30Days,
    getDateRange: () => ({
      start: dayjs()
        .subtract(30, 'days')
        .set(zeroTime)
        .toDate(),
      end: dayjs().set(dayEndTime).toDate(),
    }),
  },
  [FilterRangeTypes.LastWeek]: {
    id: FilterRangeTypes.LastWeek,
    getDateRange: () => {
      const start = dayjs()
        .startOf('week')
        .subtract(1, 'week')
        .toDate();
      const end = dayjs(start)
        .endOf('week')
        .toDate();
      return {
        start,
        end,
      };
    },
  },
  [FilterRangeTypes.LastMonth]: {
    id: FilterRangeTypes.LastMonth,
    getDateRange: () => {
      const start = dayjs()
        .startOf('month')
        .subtract(1, 'month')
        .toDate();
      const end = dayjs(start)
        .endOf('month')
        .toDate();
      return {
        start,
        end,
      };
    },
  },
  [FilterRangeTypes.LastYear]:
    {
      id: FilterRangeTypes.LastYear,
      getDateRange: () => {
        const start = dayjs()
          .startOf('year')
          .subtract(1, 'year')
          .toDate();
        const end = dayjs(start)
          .endOf('year')
          .toDate();
        return {
          start,
          end,
        };
      },
    },
  [FilterRangeTypes.ThisMonth]:
    {
      id: FilterRangeTypes.ThisMonth,
      getDateRange: () => ({
        start: dayjs()
          .startOf('month').toDate(),
        end: dayjs().set(dayEndTime).toDate(),
      }),
    },
  [FilterRangeTypes.ThisWeek]:
    {
      id: FilterRangeTypes.ThisWeek,
      getDateRange: () => ({
        start: dayjs()
          .startOf('week').toDate(),
        end: dayjs().set(dayEndTime).toDate(),
      }),
    },
  [FilterRangeTypes.ThisYear]:
    {
      id: FilterRangeTypes.ThisYear,
      getDateRange: () => ({
        start: dayjs()
          .startOf('year').toDate(),
        end: dayjs().set(dayEndTime).toDate(),
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

/* if (REDUCE_DB_COUNT_CALLS) {
  [FilterRangeTypes.All, FilterRangeTypes.LastYear, FilterRangeTypes.ThisYear].forEach((f) => {
    allDatePickerRanges.splice(allDatePickerRanges.indexOf(FilterRangesByLocal[f]), 1);
    delete FilterRangesByLocal[f];
    delete FilterRangeTypes[f];
  });
} */

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

export function identifyRange(startDate: Date, endDate: Date, registerDate: string, allRanges: FilterRange[]) {
  const startDayjs = dayjs(startDate);
  const inputDatesDifferenceInDays = startDayjs.diff(endDate, 'days');
  const foundRange = allRanges.find((rangeItem) => {
    const { start, end } = rangeItem.getDateRange(registerDate);
    const rangeItemDifferenceInDays = dayjs(start).diff(end, 'days');
    return startDayjs.isSame(start) && inputDatesDifferenceInDays === rangeItemDifferenceInDays;
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
        ? new Date(values['dateCreated[start]'])
        : null,
    }),
    ...(filterStructure['dateCreated[end]'] && {
      'dateCreated[end]': values['dateCreated[end]']
        ? new Date(values['dateCreated[end]'])
        : null,
    }),
    // For Customer Support
    ...(filterStructure.asMerchantId && { asMerchantId }),
  };
}

// json -> url search object
export function filterSerialize(filter: FilterI): Serializable<FilterI> {
  const { status, flowIds, countries, updatedBy, eventType } = filter;

  let serializedDateCreatedStart: string;
  let serializedDateCreatedEnd: string;
  if (filter['dateCreated[start]']) {
    serializedDateCreatedStart = filter['dateCreated[start]'].toJSON();
  }
  if (filter['dateCreated[end]']) {
    serializedDateCreatedEnd = filter['dateCreated[end]'].toJSON();
  }
  const serialized: Serializable<FilterI> = {
    ...filter,
    'dateCreated[start]': serializedDateCreatedStart,
    'dateCreated[end]': serializedDateCreatedEnd,
    status: status?.join(','),
    flowIds: flowIds?.join(','),
    countries: countries?.join(','),
    updatedBy: updatedBy?.join(','),
    eventType: eventType?.join(','),
  };

  return pickBy(serialized, identity);
}

export function parseFromURL(url, filterStructure) {
  // TODO: @pabloscdo Fix this any when filterParse is typed
  const fromURL: any = Object.fromEntries(new URLSearchParams(url));
  return filterParse(fromURL, filterStructure);
}

export function getFilterDatesIsValid(filter) {
  return filter['dateCreated[start]'] && filter['dateCreated[end]'];
}

export const initDateFilter = {
  'dateCreated[start]': null,
  'dateCreated[end]': null,
};

const defaultInitDateFilterPeriod = FilterRangesByLocal[FilterRangeTypes.Last7Days].getDateRange();
export const lastSevenDaysFilter = {
  'dateCreated[start]': defaultInitDateFilterPeriod.start,
  'dateCreated[end]': defaultInitDateFilterPeriod.end,
};

export enum RangeParts {
  Start = 'start',
  End = 'end',
}

export const RangeSlices = {
  From: 'from',
  To: 'to',
};
