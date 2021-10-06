import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { OverlayI } from '../../models/Overlay.model';
import { selectOverlayStack } from '../../state/overlay.selectors';
import { Overlay } from '../Overlay/Overlay';

export function OverlayContainer() {
  const overlayStack = useSelector<any, OverlayI[]>(selectOverlayStack);
  const rootRef = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    const rootEl = rootRef.current;

    rootEl.id = 'overlayRoot';
    rootEl.style.position = 'relative';
    document.body.appendChild(rootEl);

    return () => rootEl.remove();
  }, []);

  return overlayStack.length
    ? createPortal(<Overlay {...overlayStack[overlayStack.length - 1]} />, rootRef.current)
    : null;
}
