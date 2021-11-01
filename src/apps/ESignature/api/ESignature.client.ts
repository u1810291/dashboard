import { http } from 'lib/client/http';

export function uploadESignatureDocument(form: FormData) {
  return http.post('v1/media/pdf-document', form);
}
