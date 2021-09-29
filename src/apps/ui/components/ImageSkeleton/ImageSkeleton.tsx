import classNames from 'classnames';
import { BsCameraVideo, BsCardImage } from 'react-icons/bs';
import React from 'react';
import { useStyles } from './ImageSkeleton.styles';

export function ImageSkeleton({ className, isVideoPlaceholder }: {className?: string; isVideoPlaceholder?: boolean}) {
  const classes = useStyles();
  return (
    <div className={classNames(classes.container, classes.loader, className)}>
      {isVideoPlaceholder ? <BsCameraVideo className={classes.imageIcon} /> : <BsCardImage className={classes.imageIcon} />}
    </div>
  );
}
