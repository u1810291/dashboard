import { getQueryFromObject } from 'lib/url';
import { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

export function useTableRightClickNoRedirect(redirectUrl, queryParams = {}) {
  const history = useHistory();
  const [mouseUpExpired, setMouseUpExpired] = useState(false);
  const searchQuery = useMemo(() => getQueryFromObject(queryParams), [queryParams]);

  const handleRedirect = useCallback((id) => {
    history.push({
      pathname: `${redirectUrl}/${id}`,
      search: searchQuery ? `?${searchQuery}` : '',
      state: { from: history.location.pathname + history.location.search },
    });
  }, [history, redirectUrl, searchQuery]);

  const onMouseDownHandler = useCallback((event) => {
    if (event.button === 0) {
      setMouseUpExpired(false);
      setTimeout(() => setMouseUpExpired(true), 200);
    }
    if (event.button === 1) {
      event.preventDefault();
    }
  }, []);

  const onMouseUpHandler = useCallback((event, id) => {
    if (event.button === 0 && !mouseUpExpired) {
      handleRedirect(id);
    }
    if (event.button === 1) {
      window.open(`${redirectUrl}/${id}${searchQuery ? `?${searchQuery}` : ''}`, '_blank', 'noopener');
    }
  }, [handleRedirect, mouseUpExpired, redirectUrl, searchQuery]);

  return [onMouseDownHandler, onMouseUpHandler];
}
