import { getStepStatus, IStep, StepStatus } from 'models/Step.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { VerificationResponse } from 'models/Verification.model';
import { getDownloadableFileName } from 'models/Identity.model';

export interface ReVerificationData {
  currentSelfiePhotoUrl: string;
  currentSelfieVideoUrl: string;
  previousSelfieVideoUrl: string;
  previousSelfiePhotoUrl: string;
  previousVerificationId: string;
}

export interface IReFacematchStep extends IStep<ReVerificationData> {
  checkStatus: StepStatus;
  downloadableFileName: string;
}

export function getReVerificationStep(verification: VerificationResponse) {
  const reFacematch = verification.steps.find((item: IStep) => item.id === VerificationPatternTypes.ReFacematch);

  if (!reFacematch) {
    return null;
  }

  return {
    reFacematch: {
      ...reFacematch,
      checkStatus: getStepStatus(reFacematch),
      labelExtraData: reFacematch?.error?.code,
      downloadableFileName: getDownloadableFileName(verification),
    },
  };
}
