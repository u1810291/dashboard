import { http } from 'lib/client/http';

export function getMedia(src) {
  const { headers } = http.getAuthHeader();
  return fetch(src, { headers });
}
