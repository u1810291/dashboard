import { filterSerialize, parseFromURL } from 'models/Filter.model';
import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export function useFilterParser(filterStructure) {
  const history = useHistory();
  const location = useLocation();

  const setURLFromFilter = useCallback((filter) => {
    const newParams = filterSerialize(filter);
    const search = new URLSearchParams(newParams);
    history.push({
      pathname: location.pathname,
      search: search.toString(),
      state: location.state,
    });
  }, [history, location.pathname, location.state]);

  const addToUrl = useCallback((filter) => {
    const currentParams = parseFromURL(location.search || '', filterStructure);
    const newParams = { ...currentParams, ...filter };
    const newFilter = filterSerialize(newParams);
    const search = new URLSearchParams(newFilter);
    history.push({
      pathname: location.pathname,
      search: search.toString(),
      state: location.state,
    });
  }, [filterStructure, history, location.pathname, location.search, location.state]);

  return [setURLFromFilter, addToUrl];
}
