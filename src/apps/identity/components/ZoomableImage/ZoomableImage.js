import { OverlayWithBlur } from 'apps/overlay';
import React, { useCallback, useState } from 'react';
import { FiRotateCcw, FiRotateCw, FiZoomIn } from 'react-icons/fi';
import { Box } from '@material-ui/core';
import { useStyles } from './ZoomableImage.styles';

export function ZoomableImage({ src = '', alt = '' }) {
  const classes = useStyles();
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
  const handleWrapperClick = useCallback(() => setIsModalShown(true), [setIsModalShown]);
  const handleRotateLeftClick = useCallback(() => rotate(angle - 90), [rotate, angle]);
  const handleRotateRightClick = useCallback(() => rotate(angle + 90), [rotate, angle]);

  return (
    <>
      <div
        className={classes.initImage}
        onKeyDown={rotateEvent}
        role="button"
        tabIndex="0"
      >
        <div
          className="hoverWrapper"
          onClick={handleWrapperClick}
          onKeyUp={() => {}}
          role="button"
          tabIndex="0"
        >
          <FiZoomIn color="white" size={28} className="zoomIcon" />
        </div>
        <img src={src} alt={alt} className={classes.initImage} />
        {isModalShown && (
        <OverlayWithBlur onClose={handleClose}>
          <Box className={classes.zoomContent}>
            <img
              className="zoomedImage"
              src={src}
              alt={alt}
              style={{ transform: `rotate(${angle}deg)` }}
              onKeyDown={rotateEvent}
              role="presentation"
            />

            <div className="actions">
              <FiRotateCcw
                className="left"
                color="white"
                size="2em"
                onClick={handleRotateLeftClick}
                onKeyDown={rotateEvent}
                tabIndex="0"
              />
              <FiRotateCw
                className="right"
                color="white"
                size="2em"
                onClick={handleRotateRightClick}
                onKeyDown={rotateEvent}
                tabIndex="0"
              />
            </div>
          </Box>
        </OverlayWithBlur>
        )}
      </div>
    </>
  );
}
