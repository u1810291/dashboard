import classNames from 'classnames';
import React, { useCallback, useEffect, useRef } from 'react';
import CSS from './Overlay.module.scss';

export function findRelativeParent(element) {
  if (!element) {
    return undefined;
  }

  const parent = element.nodeName === 'HTML' ? element : element.parentElement;

  if (!parent) {
    return element;
  }

  return parent.style.position === 'relative' || parent.nodeName === 'HTML'
    ? parent
    : findRelativeParent(parent);
}

export function Overlay({ withBlur = false, inline = false, onClose, options, children }) {
  const overlayRef = useRef();

  const handleClose = useCallback((e) => {
    if (e.target === e.currentTarget && !options?.sticky) {
      if (options?.onClose) {
        options.onClose();
      } else {
        onClose();
      }
    }
  }, [onClose, options]);

  useEffect(() => {
    const parent = findRelativeParent(overlayRef.current);
    parent.classList.add(CSS.noScroll);

    return () => {
      parent.classList.remove(CSS.noScroll);
    };
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={classNames(
        CSS.overlayVisible,
        withBlur ? CSS.blurOverlay : CSS.overlay,
        { [CSS.overlayInline]: inline },
        options?.additionalClasses?.map((item) => CSS[item]),
      )}
      onClick={handleClose}
      ref={overlayRef}
    >
      <span
        className={classNames(
          withBlur ? CSS.blurOverlayContent : CSS.overlayContent,
          CSS.overlayContentVisible,
        )}
      >
        {children}
      </span>
    </div>
  );
}
