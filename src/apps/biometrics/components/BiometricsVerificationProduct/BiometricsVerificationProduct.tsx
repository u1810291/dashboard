import React from 'react';
import { getDownloadableFileName } from 'models/Identity.model';
import { Verification } from 'models/Verification.model';
import { NewLivenessStep } from '../NewLivenessStep/NewLivenessStep';

export function BiometricsVerificationProduct({ data }: {
  data: Verification;
}) {
  const downloadableFileName = getDownloadableFileName(data);
  const steps = data?.biometric || [];
  return (
    <NewLivenessStep steps={steps} downloadableFileName={downloadableFileName} />
  );
}
