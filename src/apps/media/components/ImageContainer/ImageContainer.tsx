import React, { ImgHTMLAttributes } from 'react';
import { ImageSkeleton } from 'apps/ui';
import { MediaStatusTypes } from 'apps/media/models/Media.model';

export function ImageContainer({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  if (src === MediaStatusTypes.MediaIsLoading) {
    return (<ImageSkeleton className={props.className} />);
  }

  return (<img src={src} alt={alt} {...props} />);
}
