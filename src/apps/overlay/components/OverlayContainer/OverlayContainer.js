import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { selectOverlay } from '../../state/overlay.selectors';
import Overlay from '../Overlay/Overlay';

export function OverlayContainer() {
  const overlay = useSelector(selectOverlay);
  const root = document.getElementById('overlayRoot');

  useEffect(() => {
    const rootEl = document.createElement('div');
    rootEl.id = 'overlayRoot';
    rootEl.style.position = 'relative';
    document.body.appendChild(rootEl);
    return () => rootEl.remove();
  }, []);

  return overlay
    ? createPortal(
      <Overlay {...overlay} />, root)
    : null;
}
