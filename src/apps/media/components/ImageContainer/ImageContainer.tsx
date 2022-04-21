import React, { ImgHTMLAttributes, useState } from 'react';
import { ImageSkeleton } from 'apps/ui';
import { getMediaURL } from 'lib/client/media';

export function ImageContainer({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement> & {src: string}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const hideSkeletonLoader = () => setIsLoading(false);

  return (
    <>
      {isLoading && <ImageSkeleton className={props.className} />}
      {/* TODO: Refine hide mechanism here */}
      <img src={getMediaURL(src)} alt={alt} style={{ display: isLoading ? 'none' : 'inherit' }} {...props} onLoad={hideSkeletonLoader} />
    </>
  );
}
