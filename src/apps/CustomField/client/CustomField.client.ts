import { http } from 'lib/client/http';
import { ICustomField, VerificationCustomFieldsInputData } from 'models/CustomField.model';

export function customFieldUpdate(verificationId: string, fields: ICustomField[], country: string) {
  return http.patch<{customFieldsDataCopy: VerificationCustomFieldsInputData}>(`/api/v1/dashboard/verification/${verificationId}/update-custom-fields-copy`, { customFieldsDataCopy: { fields, country } });
}
