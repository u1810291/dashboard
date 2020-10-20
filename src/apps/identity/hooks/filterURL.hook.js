import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { filterSerialize } from '../models/filter.model';

export function useFilterParser() {
  const history = useHistory();
  const location = useLocation();

  const updateURL = useCallback((filter) => {
    const newParams = filterSerialize({ ...filter });
    const search = new URLSearchParams(newParams);
    history.push({
      pathname: location.pathname,
      search: search.toString(),
    });
  }, [history, location.pathname]);

  return [updateURL];
}
