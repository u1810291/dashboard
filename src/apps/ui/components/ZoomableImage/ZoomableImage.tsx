import { OverlayWithBlur } from 'apps/overlay';
import React, { useCallback, useMemo, useState } from 'react';
import { FiRotateCcw, FiRotateCw, FiX, FiZoomIn } from 'react-icons/fi';
import { Box } from '@material-ui/core';
import { KeyboardKeys } from 'models/Keyboard.model';
import { ImageContainer, MediaStatusTypes, useLoadPrivateMedia } from 'apps/media';
import { useStyles } from './ZoomableImage.styles';

export function ZoomableImage({ src = '', alt = '', isNotLoaded = false }: {src: string | MediaStatusTypes; alt?: string; isNotLoaded?: boolean}) {
  const classes = useStyles();
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [angle, rotate] = useState<number>(0);
  const [objectUrl, isLoading] = useLoadPrivateMedia(isNotLoaded ? src : null);

  /* TODO @vladislav.snimshchikov: add proofOfOwnership caching on identity level and remove isNotLoaded logic */
  const mediaSrc = useMemo(() => (isNotLoaded ? objectUrl : src), [isNotLoaded, objectUrl, src]);
  const resultMediaSrc = useMemo(() => (isLoading ? MediaStatusTypes.MediaIsLoading : mediaSrc), [isLoading, mediaSrc]);

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
        <ImageContainer src={resultMediaSrc} alt={alt} className={classes.initImage} />
        {isModalShown && (
        <OverlayWithBlur onClose={handleClose}>
          <Box className={classes.zoomContent}>
            <ImageContainer
              className={classes.zoomedImage}
              src={resultMediaSrc}
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
