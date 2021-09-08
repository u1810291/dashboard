import React, { ImgHTMLAttributes, useCallback, useEffect, useState } from 'react';
import { notification } from 'apps/ui';
import { getMedia } from '../../api/media.client';
import { collectMediaChunks } from '../../models/media.model';
import { ErrorMessages } from '../../../../models/Error.model';

export function PrivateImage({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [objectSrc, setObjectSrc] = useState(null);

  const updateImage = useCallback((chunks: any[], receivedLength: number, type: string) => {
    const blob = collectMediaChunks(chunks, receivedLength, type);
    const objURL = URL.createObjectURL(blob);
    setObjectSrc(objURL);

    return objURL;
  }, []);

  useEffect(() => {
    const load = async () => {
      if (!src) {
        return;
      }

      try {
        const response = await getMedia(src);
        const type = response.headers.get('content-type');
        const reader = response.body.getReader();
        const contentLength = Number(response.headers.get('Content-Length'));
        let receivedLength = 0;
        let capacityForRender = 0;
        let lastObjectUrl = null;
        const chunks = [];

        const updateLastObjectUrl = (objectUrl: string) => {
          if (lastObjectUrl) {
            URL.revokeObjectURL(lastObjectUrl);
          }
          lastObjectUrl = objectUrl;
        };

        // eslint-disable-next-line no-constant-condition
        while (true) {
          // eslint-disable-next-line no-await-in-loop
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          chunks.push(value);
          receivedLength += value.length;
          capacityForRender += value.length;

          if (capacityForRender / contentLength > 0.1) {
            const objectUrl = updateImage(chunks, receivedLength, type);
            updateLastObjectUrl(objectUrl);
            capacityForRender = 0;
          }
        }

        const finalObjectUrl = updateImage(chunks, receivedLength, type);
        updateLastObjectUrl(finalObjectUrl);

        // eslint-disable-next-line consistent-return
        return () => URL.revokeObjectURL(finalObjectUrl);
      } catch (error) {
        console.error(error);
        notification.error(ErrorMessages.ERROR_COMMON);
      }
    };

    load();
  }, [src, updateImage]);

  return (
    <img src={objectSrc} alt={alt} {...props} />
  );
}
