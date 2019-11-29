export function getMediaURL(url = '') {
  if (!process.env.REACT_APP_MEDIA_PROXY) {
    return url;
  }
  return url.replace(process.env.REACT_APP_MEDIA_URL, process.env.REACT_APP_MEDIA_PROXY);
}
