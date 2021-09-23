import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { selectOverlay } from '../../state/overlay.selectors';
import { Overlay } from '../Overlay/Overlay';

export function OverlayContainer() {
  const overlay = useSelector(selectOverlay);
  const rootRef = useRef(document.createElement('div'));

  useEffect(() => {
    const rootEl = rootRef.current;

    rootEl.id = 'overlayRoot';
    rootEl.style.position = 'relative';
    document.body.appendChild(rootEl);

    return () => rootEl.remove();
  }, []);

  return overlay
    ? createPortal(<Overlay {...overlay} />, rootRef.current)
    : null;
}
