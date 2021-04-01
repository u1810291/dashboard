import { ITEMS_PER_PAGE } from 'models/Pagination.model';

export const RangeParts = {
  Start: 'start',
  End: 'end',
};

export const RangeSlices = {
  From: 'from',
  To: 'to',
};

export const verificationsFilterInitialState = {
  search: '',
  status: [],
  flowIds: [],
  'dateCreated[start]': null,
  'dateCreated[end]': null,
  sortOrder: null,
  sortBy: null,
  offset: 0,
  limit: ITEMS_PER_PAGE,
};

export const verificationsFilterStructure = {
  search: 'search',
  status: 'status',
  flowIds: 'flowIds',
  'dateCreated[start]': 'dateCreated[start]',
  'dateCreated[end]': 'dateCreated[end]',
  offset: 'offset',
  limit: 'limit',
  sortOrder: 'sortOrder',
  sortBy: 'sortBy',
};

export const analyticsFilterStructure = {
  flowIds: 'flowIds',
  countries: 'countries',
  'dateCreated[start]': 'dateCreated[start]',
  'dateCreated[end]': 'dateCreated[end]',
};

export const verificationsClearFilter = {
  status: [],
  flowIds: [],
  'dateCreated[start]': null,
  'dateCreated[end]': null,
  sortOrder: null,
  sortBy: null,
};

export const analyticsClearFilter = {
  flowIds: [],
  countries: [],
  'dateCreated[start]': null,
  'dateCreated[end]': null,
};
