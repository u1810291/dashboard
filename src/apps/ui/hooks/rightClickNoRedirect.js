import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

export function useTableRightClickNoRedirect(redirectUrl) {
  const history = useHistory();
  const [mouseUpExpired, setMouseUpExpired] = useState(false);

  const handleRedirect = useCallback((id) => {
    history.push({
      pathname: `${redirectUrl}/${id}`,
      state: { from: history.location.pathname + history.location.search },
    });
  }, [history, redirectUrl]);

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
      window.open(`${redirectUrl}/${id}`, '_blank');
    }
  }, [handleRedirect, mouseUpExpired, redirectUrl]);

  return [onMouseDownHandler, onMouseUpHandler];
}
