import React from 'react';
import { getDownloadableFileName } from 'models/Identity.model';
import { VerificationWithExtras } from 'models/VerificationOld.model';
import { NewLivenessStep } from '../NewLivenessStep/NewLivenessStep';

export function BiometricsVerificationProduct({ data }: {
  data: VerificationWithExtras;
}) {
  const downloadableFileName = getDownloadableFileName(data);
  const steps = data?.biometric || [];
  return (
    <NewLivenessStep steps={steps} downloadableFileName={downloadableFileName} />
  );
}
