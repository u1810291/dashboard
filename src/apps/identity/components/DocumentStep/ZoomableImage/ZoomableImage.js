import { Content, OverlayWithBlur } from 'components';
import React, { useState } from 'react';
import { FiRotateCcw, FiRotateCw, FiZoomIn } from 'react-icons/fi';
import CSS from './ZoomableImage.module.scss';

export function ZoomableImage({ src = '', alt = '' }) {
  const [isModalShown, setIsModalShown] = useState(false);
  const [angle, rotate] = useState(0);

  const handleClose = () => {
    const root = document.getElementById('overlayRootWithBlur');
    rotate(0);
    setIsModalShown(false);
    if (root) {
      root.remove();
    }
    document.body.style.position = 'relative';
    document.body.className = '';
  };

  const rotateEvent = (event) => {
    if (event.keyCode === 37) {
      rotate(angle - 90);
    }
    if (event.keyCode === 39) {
      rotate(angle + 90);
    }
    if (event.keyCode === 27) {
      document.body.style.position = 'fixed';
      handleClose();
    }
  };

  return (
    <div
      className={CSS.initImage}
      onKeyDown={rotateEvent}
      role="button"
      tabIndex="0"
    >
      <div
        className={CSS.hoverWrapper}
        onClick={() => setIsModalShown(true)}
        onKeyUp={() => {}}
        role="button"
        tabIndex="0"
      >
        <FiZoomIn color="white" size={28} className={CSS.zoomIcon} />
      </div>
      <img src={src} alt={alt} className={CSS.initImage} />
      {isModalShown && (
      <OverlayWithBlur onClose={handleClose}>
        <Content
          fullwidth={false}
          className={CSS.zoomContent}
          onClick={() => setIsModalShown(false)}
        >
          <img
            className={CSS.zoomedImage}
            src={src}
            alt={alt}
            style={{ transform: `rotate(${angle}deg)` }}
            onKeyDown={rotateEvent}
            role="presentation"
          />

          <div className={CSS.actions}>
            <FiRotateCcw
              className={CSS.left}
              color="white"
              size="2em"
              onClick={() => rotate(angle - 90)}
              onKeyDown={rotateEvent}
              tabIndex="0"
            />
            <FiRotateCw
              className={CSS.right}
              color="white"
              size="2em"
              onClick={() => rotate(angle + 90)}
              onKeyDown={rotateEvent}
              tabIndex="0"
            />
          </div>
        </Content>
      </OverlayWithBlur>
      )}
    </div>
  );
}
