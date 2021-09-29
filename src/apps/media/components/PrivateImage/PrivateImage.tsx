import React, { ImgHTMLAttributes, useEffect } from 'react';
import { ImageSkeleton } from 'apps/ui';
import { useLoadPrivateMedia } from '../../hooks/loadPrivateMedia.hook';

export function PrivateImage({ src, alt, onDownload, ...props }: ImgHTMLAttributes<HTMLImageElement> & {onDownload?: (objectUrl: string) => void}) {
  const [objectUrl, isLoading] = useLoadPrivateMedia(src);

  useEffect(() => {
    if (onDownload && !isLoading && objectUrl) {
      onDownload(objectUrl);
    }
  }, [isLoading, objectUrl, onDownload]);

  if (isLoading) {
    return (
      <ImageSkeleton className={props.className} />
    );
  }

  return (
    <img src={objectUrl} alt={alt} {...props} />
  );
}
