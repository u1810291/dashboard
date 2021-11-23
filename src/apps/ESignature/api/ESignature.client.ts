import { http } from 'lib/client/http';

export function uploadESignatureDocument(form: FormData) {
  return http.post('/api/v1/media/pdf-document', form);
}
