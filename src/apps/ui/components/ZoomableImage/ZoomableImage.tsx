import { OverlayWithBlur } from 'apps/overlay';
import React, { useCallback, useState } from 'react';
import { FiRotateCcw, FiRotateCw, FiX, FiZoomIn } from 'react-icons/fi';
import { Box } from '@material-ui/core';
import { KeyboardKeys } from 'models/Keyboard.model';
import { useStyles } from './ZoomableImage.styles';

export function ZoomableImage({ src = '', alt = '' }: {src: string; alt?: string}) {
  const classes = useStyles();
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [angle, rotate] = useState<number>(0);

  const handleClose = () => {
    rotate(0);
    setIsModalShown(false);
  };

  const rotateEvent = (event: React.KeyboardEvent) => {
    if (event.key === KeyboardKeys.ArrowLeft) {
      rotate(angle - 90);
    }
    if (event.key === KeyboardKeys.ArrowRight) {
      rotate(angle + 90);
    }
    if (event.key === KeyboardKeys.Escape) {
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
        tabIndex={0}
      >
        <div
          className={classes.hoverWrapper}
          onClick={handleWrapperClick}
          onKeyUp={() => {}}
          role="button"
          tabIndex={0}
        >
          <FiZoomIn color="white" size={28} className="zoomIcon" />
        </div>
        <img src={src} alt={alt} className={classes.initImage} />
        {isModalShown && (
        <OverlayWithBlur onClose={handleClose}>
          <Box className={classes.zoomContent}>
            <img
              className={classes.zoomedImage}
              src={src}
              alt={alt}
              style={{ transform: `rotate(${angle}deg)` }}
              onKeyDown={rotateEvent}
              role="presentation"
            />

            <div className={classes.actions}>
              <FiRotateCcw
                className={classes.actionIcon}
                color="white"
                size="2em"
                onClick={handleRotateLeftClick}
                onKeyDown={rotateEvent}
                tabIndex={0}
              />
              <FiRotateCw
                className={classes.actionIcon}
                color="white"
                size="2em"
                onClick={handleRotateRightClick}
                onKeyDown={rotateEvent}
                tabIndex={0}
              />
              <FiX
                className={classes.actionIcon}
                color="white"
                size="2em"
                onClick={handleClose}
                onKeyDown={rotateEvent}
                tabIndex={0}
              />
            </div>
          </Box>
        </OverlayWithBlur>
        )}
      </div>
    </>
  );
}
