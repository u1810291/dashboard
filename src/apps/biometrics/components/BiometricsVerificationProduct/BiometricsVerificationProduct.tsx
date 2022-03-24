import React from 'react';
import { getDownloadableFileName } from 'models/Identity.model';
import { VerificationWithExtras } from 'models/VerificationOld.model';
import { IDuplicateSelfieStepData, SelfieStepTypes } from 'models/Biometric.model';
import { IStep } from 'models/Step.model';
import { NewLivenessStep } from '../NewLivenessStep/NewLivenessStep';

export function BiometricsVerificationProduct({ data }: {
  data: VerificationWithExtras;
}) {
  const downloadableFileName = getDownloadableFileName(data);
  const steps = data?.biometric || [];
  const duplicateFaceDetection: IStep<IDuplicateSelfieStepData> = data?.steps?.find((step) => step.id === SelfieStepTypes.DuplicateSelfieValidation);

  return (
    <NewLivenessStep duplicateFaceDetection={duplicateFaceDetection} steps={steps} downloadableFileName={downloadableFileName} />
  );
}
