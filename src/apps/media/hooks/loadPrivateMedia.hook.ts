import { useCallback, useEffect, useState } from 'react';
import { notification } from 'apps/ui';
import { ErrorMessages } from 'models/Error.model';
import { getMedia } from '../api/media.client';

export function useLoadPrivateMedia(src): [string, boolean] {
  const [objectSrc, setObjectSrc] = useState<string>(null);
  const [loading, setLoading] = useState(false);

  const updateImage = useCallback((blob: Blob) => {
    const objURL = URL.createObjectURL(blob);
    setObjectSrc(objURL);
  }, []);

  useEffect(() => {
    const load = async () => {
      if (!src) {
        return;
      }

      try {
        setLoading(true);
        console.log(src);
        const response = await getMedia(src);
        console.log(response);
        const blob = await response.blob();
        console.log(blob);
        updateImage(blob);
        setLoading(false);
      } catch (error) {
        console.error(error);
        notification.error(ErrorMessages.ERROR_COMMON);
      }
    };

    load();
  }, [src, updateImage]);

  useEffect(() => () => {
    URL.revokeObjectURL(src);
  }, [src]);

  return [objectSrc, loading];
}
