export function getMediaURL(uri) {
  let targetUri = uri || '';
  if (process.env.REACT_APP_MEDIA_PROXY) {
    targetUri = uri.replace(process.env.REACT_APP_MEDIA_URL, process.env.REACT_APP_MEDIA_PROXY);
  }

  return {
    method: 'GET',
    headers: new Headers({ origin: window.location.origin }),
    uri: targetUri,
  };
}
