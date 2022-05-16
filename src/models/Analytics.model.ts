import { initDateFilter } from 'models/Filter.model';

export const analyticsCleanFilter = {
  ...initDateFilter,
  flowIds: [],
  countries: [],
};
export const analyticsFilterStructure = {
  flowIds: 'flowIds',
  countries: 'countries',
  'dateCreated[start]': 'dateCreated[start]',
  'dateCreated[end]': 'dateCreated[end]',
  // For Customer Support
  asMerchantId: 'asMerchantId',
};

export interface IFilter {
  'dateCreated[start]': string;
  'dateCreated[end]': string;
  flowIds: string[];
  countries: string[];

  // For Customer Support
  asMerchantId: string;
}

export interface IChart {
  byCountry: {
    documentCountry: string;
    count: number;
  }[];
  byHour: {
    hour: string;
    count: number;
  }[];
  byDayOfWeek: {
    dayOfWeek: string;
    count: number;
  }[];
  byDate: {
    date: string;
    count: number;
  }[];
}

export interface IStatistics {
    countStats: {
      all: number;
      verified: number;
      rejected: number;
    };
    documentTypeStats: {
      passport: number;
      'national-id': number;
      'driving-license': number;
      'proof-of-residency': number;
    };
    statusStat: {
      all: number;
      verified: number;
      rejected: number;
    };
    documentTypeStat: {
      'national-id': number;
      'driving-license': number;
      passport: number;
      'proof-of-residency': number;
    };
    deviceAndBrowserStat: {
      devices: {
        name: string;
        count: number;
        percentage: number;
      }[];
      browsers: {
          name: string;
          count: number;
          percentage: number;
      }[];
    };
  }
