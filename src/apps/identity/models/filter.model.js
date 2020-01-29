import { ITEMS_PER_PAGE } from 'apps/pagination';
import { identity, pickBy } from 'lodash';
import moment from 'moment';

export const initialFilter = {
  search: '',
  status: [],
  'dateCreated[start]': null,
  'dateCreated[end]': null,
  offset: 0,
  limit: ITEMS_PER_PAGE,
};

// url search object -> json
export function filterParse(values) {
  return {
    search: values.search,
    status: values.status ? values.status.split(',') : [],
    'dateCreated[start]': values['dateCreated[start]']
      ? moment(values['dateCreated[start]'])
      : null,
    'dateCreated[end]': values['dateCreated[end]']
      ? moment(values['dateCreated[end]'])
      : null,
    offset: +values.offset || 0,
    limit: ITEMS_PER_PAGE,
  };
}

// json -> url search object
export function filterSerialize(filter) {
  const { status, ...serialized } = filter;
  serialized.status = status.join(',');
  if (serialized['dateCreated[start]']) {
    serialized['dateCreated[start]'] = serialized['dateCreated[start]'].toJSON();
  }
  if (serialized['dateCreated[end]']) {
    serialized['dateCreated[end]'] = serialized['dateCreated[end]'].toJSON();
  }
  return pickBy(serialized, identity);
}
