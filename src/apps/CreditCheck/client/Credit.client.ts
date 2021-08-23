import { http } from 'lib/client/http';
import { ApiResponse } from 'models/Client.model';
import { CreditCheckManulRunResponse } from 'models/CreditCheck.model';
import { DocumentTypes } from 'models/Document.model';

export function creditCheckManualRun(verificationId: string, documentType: DocumentTypes, stepId: string): Promise<ApiResponse<CreditCheckManulRunResponse>> {
  return http.patch(`/api/v1/dashboard/verification/${verificationId}/step/${stepId}/run-post-result?documentType=${documentType}`, {});
}
