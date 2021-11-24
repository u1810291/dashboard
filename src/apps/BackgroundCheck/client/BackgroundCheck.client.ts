import { http } from 'lib/client/http';
import { BackgroundCheckStepData } from 'models/BackgroundCheck.model';
import { VerificationResponse } from 'models/Verification.model';

export function backgroundCheckManualRun(verificationId: string, stepId: string) {
  return http.patch<VerificationResponse<BackgroundCheckStepData>>(`/api/v1/dashboard/verification/${verificationId}/step/${stepId}/run-post-result`, {});
}
