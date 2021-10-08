import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { OverlayOptions } from '../models/Overlay.model';
import { overlayClose, overlayCreate } from '../state/overlay.actions';

export function useOverlay(): [(children: React.ReactNode, opts?: OverlayOptions) => void, () => void ] {
  const dispatch = useDispatch();

  const closeOverlay = useCallback(() => {
    dispatch(overlayClose());
  }, [dispatch]);

  const createOverlay = useCallback((children: React.ReactNode, opts?: OverlayOptions) => {
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
