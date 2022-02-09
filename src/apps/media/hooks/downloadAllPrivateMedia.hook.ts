import { useCallback, useEffect, useState } from 'react';
import { MediaBlobUrl, startDownloadMedia } from 'apps/media/models/Media.model';
import isString from 'lodash/isString';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';

export function useDownloadAllPrivateMedia(objectWithMedia: any) {
  const [mediaWithDownload, setMediaWithDownload] = useState(objectWithMedia);
  const [mediaBlobUrls, setMediaBlobUrls] = useState<MediaBlobUrl[]>([]);
  const handlePushToBlobCollection = useCallback((blob: MediaBlobUrl) => {
    setMediaBlobUrls((prevState) => [...prevState, blob]);
  }, []);

  useEffect(() => {
    setMediaBlobUrls([]);
    // TODO: aturkin (Facematch) links can be internal (via authorisation) or from a merchant's database, where no authorisation is needed, fix logic next time
    const faceMatchStep = objectWithMedia?.find((step) => step.id === VerificationPatternTypes.Facematch);
    const newMediaWithDownload = startDownloadMedia(objectWithMedia?.filter((step) => step.id !== VerificationPatternTypes.Facematch), handlePushToBlobCollection);
    if (faceMatchStep) {
      newMediaWithDownload.push(faceMatchStep);
    }
    setMediaWithDownload(newMediaWithDownload);
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
