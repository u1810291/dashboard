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
