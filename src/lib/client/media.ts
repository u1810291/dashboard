import { http } from './http';
import { ClientMethodTypes } from '../../models/Client.model';

export async function getMediaURL(uri = '', isMediaApi = true) {
  let targetUri = uri;
  if (process.env.REACT_APP_MEDIA_PROXY) {
    targetUri = uri.replace(process.env.REACT_APP_MEDIA_URL, process.env.REACT_APP_MEDIA_PROXY);
  }

  const headers = isMediaApi ? await http.getHeaders(ClientMethodTypes.GET, true) : {};
  return {
    method: 'GET',
    headers,
    uri: targetUri,
  };
}
