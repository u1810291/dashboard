import { filterSerialize } from 'models/Filter.model';
import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

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
