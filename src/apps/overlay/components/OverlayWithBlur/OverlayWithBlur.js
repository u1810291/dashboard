import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Overlay } from '../Overlay/Overlay';
import CSS from './OverlayWithBlur.module.scss';

export function OverlayWithBlur({ onClose, children }) {
  const root = useRef(document.createElement('div'));

  useEffect(() => {
    const node = root.current;
    node.className = CSS.overlayRootWithBlur;

    document.body.style.position = 'relative';
    document.body.appendChild(root.current);

    return () => {
      node.remove();
      document.body.style.position = 'relative';
      document.body.className = '';
    };
  }, []);

  return createPortal(<Overlay withBlur onClose={onClose}>{children}</Overlay>, root.current);
}
