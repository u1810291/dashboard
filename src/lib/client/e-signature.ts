import { IESignatureTemplate } from 'apps/ESignature/models/ESignature.model';
import { http } from 'lib/client/http';

export function storeTemplate(form: FormData) {
  return http.post<IESignatureTemplate>('/v1/media/pdf-document', form);
}
