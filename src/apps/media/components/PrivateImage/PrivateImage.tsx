import React, { ImgHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { BsCardImage } from 'react-icons/bs';
import { notification } from 'apps/ui';
import classNames from 'classnames';
import { getMedia } from '../../api/media.client';
import { ErrorMessages } from '../../../../models/Error.model';
import { useStyles } from './PrivateImage.styles';

export function PrivateImage({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [objectSrc, setObjectSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  // TODO: Rework images caching
  const cache = useRef(new Map());
  const classes = useStyles();

  const updateImage = useCallback((blob: Blob) => {
    const objURL = URL.createObjectURL(blob);
    setObjectSrc(objURL);
    cache.current.set(src, objURL);
  }, [src]);

  useEffect(() => {
    const load = async () => {
      if (!src) {
        return;
      }

      try {
        setLoading(true);
        const response = await getMedia(src);
        const blob = await response.blob();
        updateImage(blob);
        setLoading(false);
      } catch (error) {
        console.error(error);
        notification.error(ErrorMessages.ERROR_COMMON);
      }
    };

    if (cache.current.has(src)) {
      setObjectSrc(cache.current.get(src));
    } else {
      load();
    }
  }, [objectSrc, src, updateImage]);

  useEffect(() => () => {
    Array.from(cache.current.values()).forEach((url) => {
      URL.revokeObjectURL(url);
    });
  }, []);

  if (loading) {
    return (
      <div className={classNames(props.className, classes.container, classes.loader)}>
        <BsCardImage className={classes.imageIcon} />
      </div>
    );
  }

  return (
    <img src={objectSrc} alt={alt} {...props} />
  );
}
