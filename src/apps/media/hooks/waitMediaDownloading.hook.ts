import { useEffect, useState } from 'react';
import { isPromise } from 'lib/promise';
import isString from 'lodash/isString';

export function useWaitMediaDownloading(media: string | Promise<string>): [string, boolean] {
  const [imageUrl, setImageUrl] = useState<string>(null);
  const [isMediaLoaded, setIsMediaLoaded] = useState<boolean>(false);

  useEffect(() => {
    const waitLoad = async () => {
      if (isPromise(media)) {
        const result = await media;
        setImageUrl(result);
        setIsMediaLoaded(true);
        return;
      }
      if (isString(media)) {
        setImageUrl(media as string);
        setIsMediaLoaded(true);
      }
    };
    setIsMediaLoaded(false);
    waitLoad();
  }, [media]);

  return [imageUrl, isMediaLoaded];
}
