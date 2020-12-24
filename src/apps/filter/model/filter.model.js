import { ITEMS_PER_PAGE } from 'models/Pagination.model';

export const verificationsFilterInitialState = {
  search: '',
  status: [],
  flowIds: [],
  'dateCreated[start]': null,
  'dateCreated[end]': null,
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
};

export const analyticsClearFilter = {
  flowIds: [],
  countries: [],
  'dateCreated[start]': null,
  'dateCreated[end]': null,
};
