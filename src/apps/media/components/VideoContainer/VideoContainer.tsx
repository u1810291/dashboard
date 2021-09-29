import React, { VideoHTMLAttributes } from 'react';
import { MediaStatusTypes } from 'apps/media/models/Media.model';
import { ImageSkeleton } from 'apps/ui';

function VideoContainerComponent({ src, forwardedRef, ...props }: VideoHTMLAttributes<HTMLVideoElement> & {forwardedRef?: any}) {
  if (src === MediaStatusTypes.MediaIsLoading) {
    return (<ImageSkeleton isVideoPlaceholder className={props.className} />);
  }

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return (<video src={src} ref={forwardedRef} {...props} />);
}

export const VideoContainer = React.forwardRef(
  (props: VideoHTMLAttributes<HTMLVideoElement>, ref) => <VideoContainerComponent forwardedRef={ref} {...props} />,
);
