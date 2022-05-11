import { http } from 'lib/client/http';
import { IBackgroundCheckStepData } from 'models/BackgroundCheck.model';
import { VerificationResponse } from 'models/VerificationOld.model';

export function backgroundCheckManualRun(verificationId: string, stepId: string) {
  return http.patch<VerificationResponse<IBackgroundCheckStepData>>(`/api/v1/dashboard/verification/${verificationId}/step/${stepId}/run-post-result`, {});
}
