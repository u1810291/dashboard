import { useCallback, useEffect, useState } from 'react';
import { MediaBlobUrl, startDownloadMedia } from 'apps/media/models/Media.model';
import isString from 'lodash/isString';

export function useDownloadAllPrivateMedia(objectWithMedia: any) {
  const [mediaWithDownload, setMediaWithDownload] = useState(objectWithMedia);
  const [mediaBlobUrls, setMediaBlobUrls] = useState<MediaBlobUrl[]>([]);

  const handlePushToBlobCollection = useCallback((blob: MediaBlobUrl) => {
    setMediaBlobUrls((prevState) => [...prevState, blob]);
  }, []);

  useEffect(() => {
    setMediaBlobUrls([]);
    setMediaWithDownload(startDownloadMedia(objectWithMedia, handlePushToBlobCollection));
  }, [handlePushToBlobCollection, objectWithMedia]);

  useEffect(() => () => {
    mediaBlobUrls.forEach((item) => {
      if (isString(item)) {
        URL.revokeObjectURL(item);
      }
    });
  }, [mediaBlobUrls]);

  return mediaWithDownload;
}
