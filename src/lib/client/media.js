export function getMediaURL(uri = '') {
  if (process.env.REACT_APP_MEDIA_PROXY) {
    uri = uri.replace(process.env.REACT_APP_MEDIA_URL, process.env.REACT_APP_MEDIA_PROXY);
  }

  const link = {
    method: 'GET',
    headers: new Headers({ origin: window.location.origin }),
    uri,
  };

  return link;
}
