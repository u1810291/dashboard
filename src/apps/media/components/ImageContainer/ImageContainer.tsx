import React, { ImgHTMLAttributes } from 'react';
import { ImageSkeleton } from 'apps/ui';
import { MediaStatusTypes } from '../../models/Media.model';
import { useWaitMediaDownloading } from '../../hooks/waitMediaDownloading.hook';

export function ImageContainer({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement> & {src: string | Promise<string>}) {
  const [imageUrl, isMediaLoaded] = useWaitMediaDownloading(src);

  if (src === MediaStatusTypes.MediaIsLoading || !isMediaLoaded) {
    return (<ImageSkeleton className={props.className} />);
  }

  return (<img src={imageUrl} alt={alt} {...props} />);
}
