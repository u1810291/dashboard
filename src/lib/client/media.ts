export function getMediaURL(uri = ''): string {
  let targetUri = uri;
  if (process.env.REACT_APP_CORS_URL) {
    targetUri = uri.replace(process.env.REACT_APP_MEDIA_URL, process.env.REACT_APP_CORS_URL);
  }

  return targetUri;
}
