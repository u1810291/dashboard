import { useCallback, useEffect, useState } from 'react';
import { MediaBlobUrl, startDownloadMedia } from 'apps/media/models/Media.model';
import isString from 'lodash/isString';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { BiometricVerificationCheckTypes } from 'apps/biometricVerification';

export function useDownloadAllPrivateMedia(objectWithMedia: any) {
  const [mediaWithDownload, setMediaWithDownload] = useState(objectWithMedia);
  const [mediaBlobUrls, setMediaBlobUrls] = useState<MediaBlobUrl[]>([]);
  const handlePushToBlobCollection = useCallback((blob: MediaBlobUrl) => {
    setMediaBlobUrls((prevState) => [...prevState, blob]);
  }, []);

  useEffect(() => {
    setMediaBlobUrls([]);
    // TODO: aturkin (Facematch) links can be internal (via authorisation) or from a merchant's database, where no authorisation is needed, fix logic next time
    const newMediaWithDownload = [];
    objectWithMedia?.forEach((step) => {
      if ([VerificationPatternTypes.Facematch, BiometricVerificationCheckTypes.Liveness, BiometricVerificationCheckTypes.VoiceLiveness].includes(step.id)) {
        newMediaWithDownload.push(step);
        return;
      }
      newMediaWithDownload.push(startDownloadMedia(step, handlePushToBlobCollection));
    });
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
