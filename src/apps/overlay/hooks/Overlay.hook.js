import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { overlayClose, overlayCreate } from '../state/overlay.actions';

export function useOverlay() {
  const dispatch = useDispatch();

  const closeOverlay = useCallback(() => {
    dispatch(overlayClose());
  }, [dispatch]);

  const createOverlay = useCallback((children, opts = {}) => {
    console.log('opts', opts);
    dispatch(overlayCreate({
      children,
      options: {
        onClose: closeOverlay,
        ...opts,
      },
    }));
  }, [dispatch, closeOverlay]);

  return [
    createOverlay,
    closeOverlay,
  ];
}
