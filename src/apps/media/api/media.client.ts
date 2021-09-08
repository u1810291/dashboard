import { http } from 'lib/client/http';
import { ClientMethodTypes } from 'models/Client.model';

export async function getMedia(src) {
  const headers = await http.getHeaders(ClientMethodTypes.GET, true);
  return fetch(src, { headers });
}
