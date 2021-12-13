import { IESignatureTemplate } from 'models/ESignature.model';
import { http } from 'lib/client/http';

export function storeTemplate(form: FormData) {
  return http.post<IESignatureTemplate>('/api/v1/media/pdf-document', form);
}
