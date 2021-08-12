import { http } from 'lib/client/http';
import { IdentityStatuses } from 'models/Status.model';
import { DocumentTypes } from '../../../models/Document.model';

export function getVerification() {
  return http.get('/api/v1/dashboard/review-mode/verifications');
}

export function requestSkipVerification(verificationId: string) {
  return http.get(`/api/v1/dashboard/review-mode/verifications/${verificationId}/skip`);
}

export function getAwaitingReviewCount() {
  return http.get('/api/v1/dashboard/review-mode/counts/verifications/awaiting');
}

export function putVerificationStatus(verificationId: string, status: IdentityStatuses) {
  return http.put(`/api/v1/dashboard/review-mode/verifications/${verificationId}/status`, { status });
}

export function patchDocumentReviewMode(verificationId: string, documentType: DocumentTypes, fields: any) {
  return http.patch(`/api/v1/dashboard/review-mode/verifications/${verificationId}/documents/${documentType}/fields`, { fields });
}
