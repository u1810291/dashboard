import { useCallback, useEffect, useMemo, useState } from 'react';
import { getMedia } from 'apps/media/api/media.client';
import { MediaStatusTypes } from 'apps/media/models/Media.model';
import { BiometricStep, BiometricTypes } from 'models/Biometric.model';

export function useBiometricsWithPrivateMedia(biometrics: BiometricStep[]): BiometricStep[] {
  const voiceLiveness = useMemo(() => biometrics?.find((item) => item.id === BiometricTypes.voice), [biometrics]);
  const selfieLiveness = useMemo(() => biometrics?.find((item) => item.id === BiometricTypes.liveness || item.id === BiometricTypes.selfie), [biometrics]);
  const [selfie, setSelfie] = useState<string | MediaStatusTypes>(MediaStatusTypes.MediaIsLoading);
  const [liveness, setLiveness] = useState<string | MediaStatusTypes>(MediaStatusTypes.MediaIsLoading);
  const [voice, setVoice] = useState<string | MediaStatusTypes>(MediaStatusTypes.MediaIsLoading);

  const biometricsWithPrivateMedia = useMemo(() => biometrics?.map((biometric) => ({ ...biometric, selfieUrl: selfie, videoUrl: biometric.id === BiometricTypes.voice ? voice : liveness })) ?? [], [biometrics, liveness, selfie, voice]);

  const handleLoadMedia = useCallback(async (url, onLoad) => {
    if (!url) {
      return;
    }
    try {
      const response = await getMedia(url);
      const blob = await response.blob();
      onLoad(URL.createObjectURL(blob));
    } catch (error) {
      onLoad(MediaStatusTypes.MediaIsFailed);
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (selfieLiveness?.selfieUrl) {
      setSelfie(MediaStatusTypes.MediaIsLoading);
    }
    if (selfieLiveness?.videoUrl) {
      setLiveness(MediaStatusTypes.MediaIsLoading);
    }
    if (voiceLiveness?.videoUrl) {
      setVoice(MediaStatusTypes.MediaIsLoading);
    }
  }, [selfieLiveness?.selfieUrl, selfieLiveness?.videoUrl, voiceLiveness?.videoUrl]);

  useEffect(() => {
    handleLoadMedia(selfieLiveness?.selfieUrl, setSelfie);
  }, [handleLoadMedia, selfieLiveness?.selfieUrl]);

  useEffect(() => {
    handleLoadMedia(selfieLiveness?.videoUrl, setLiveness);
  }, [handleLoadMedia, selfieLiveness?.videoUrl]);

  useEffect(() => {
    handleLoadMedia(voiceLiveness?.videoUrl, setVoice);
  }, [handleLoadMedia, voiceLiveness?.videoUrl]);

  return biometricsWithPrivateMedia;
}
