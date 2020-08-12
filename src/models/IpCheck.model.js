export function getIpCheckUrl(data) {
  return `https://maps.googleapis.com/maps/api/staticmap?size=307x202&zoom=10&scale=2&format=png&maptype=roadmap&key=${process.env.REACT_APP_STATIC_GOOGLE_MAP_API_KEY}&markers=size:normal%7C${data.latitude},${data.longitude}`;
}
