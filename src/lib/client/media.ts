import { getMedia } from 'apps/media';

export async function getMediaURL(uri = '', isMediaApi = true): Promise<string> {
  let targetUri = uri;
  if (process.env.REACT_APP_CORS_URL) {
    targetUri = uri.replace(process.env.REACT_APP_MEDIA_URL, process.env.REACT_APP_CORS_URL);
  }

  if (isMediaApi) {
    const response = await getMedia(targetUri);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }

  return targetUri;
}
