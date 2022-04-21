/* eslint-disable jsx-a11y/media-has-caption */
import React, { VideoHTMLAttributes, useState } from 'react';
import { ImageSkeleton } from 'apps/ui';
import { getMediaURL } from 'lib/client/media';

function VideoContainerComponent({ src, forwardedRef, ...props }: VideoHTMLAttributes<HTMLVideoElement> & {src?: string | Promise<string>; forwardedRef?: any}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const hideSkeletonLoader = () => setIsLoading(false);

  return (
    <>
      {isLoading && <ImageSkeleton className={props.className} />}
      {/* TODO: Refine hide mechanism here */}
      <video src={getMediaURL(src)} ref={forwardedRef} {...props} style={{ display: isLoading ? 'none' : 'inherit' }} onLoad={hideSkeletonLoader} />
    </>
  );
}

export const VideoContainer = React.forwardRef(
  (props: VideoHTMLAttributes<HTMLVideoElement>, ref) => <VideoContainerComponent forwardedRef={ref} {...props} />,
);
