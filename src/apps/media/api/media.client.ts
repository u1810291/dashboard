import { http } from 'lib/client/http';
import { ClientMethodTypes } from 'models/Client.model';

export async function getMedia(src: string) {
  let targetUri = src;
  if (process.env.REACT_APP_CORS_URL) {
    targetUri = src.replace(process.env.REACT_APP_MEDIA_URL, process.env.REACT_APP_CORS_URL);
  }

  const headers = await http.getHeaders(ClientMethodTypes.GET);
  return fetch(targetUri, { credentials: 'include', headers });
}
