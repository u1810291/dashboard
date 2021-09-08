import React, { useEffect, useState, VideoHTMLAttributes } from 'react';
import { notification } from 'apps/ui';
import { ErrorMessages } from 'models/Error.model';
import { getMedia } from '../../api/media.client';

function PrivateVideoComponent({ src, forwardedRef, ...props }: VideoHTMLAttributes<HTMLVideoElement> & {forwardedRef?: any}) {
  const [objectSrc, setObjectSrc] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!src) {
        return;
      }

      try {
        const response = await getMedia(src);
        const blob = await response.blob();
        const objURL = URL.createObjectURL(blob);
        setObjectSrc(objURL);

        // eslint-disable-next-line consistent-return
        return () => URL.revokeObjectURL(objURL);
      } catch (error) {
        console.error(error);
        notification.error(ErrorMessages.ERROR_COMMON);
      }
    };

    load();
  }, [src]);

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return (<video src={objectSrc} ref={forwardedRef} {...props} />);
}

export const PrivateVideo = React.forwardRef(
  (props: VideoHTMLAttributes<HTMLVideoElement>, ref) => <PrivateVideoComponent forwardedRef={ref} {...props} />,
);
