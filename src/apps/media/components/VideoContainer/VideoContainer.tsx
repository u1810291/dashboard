import React, { VideoHTMLAttributes } from 'react';
import { MediaStatusTypes } from 'apps/media/models/Media.model';
import { ImageSkeleton } from 'apps/ui';
import { useWaitMediaDownloading } from '../../hooks/waitMediaDownloading.hook';

function VideoContainerComponent({ src, forwardedRef, ...props }: VideoHTMLAttributes<HTMLVideoElement> & {src?: string | Promise<string>; forwardedRef?: any}) {
  const [videoUrl, isMediaLoaded] = useWaitMediaDownloading(src);

  if (src === MediaStatusTypes.MediaIsLoading || !isMediaLoaded) {
    return (<ImageSkeleton isVideoPlaceholder className={props.className} />);
  }

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return (<video src={videoUrl} ref={forwardedRef} {...props} />);
}

export const VideoContainer = React.forwardRef(
  (props: VideoHTMLAttributes<HTMLVideoElement>, ref) => <VideoContainerComponent forwardedRef={ref} {...props} />,
);
