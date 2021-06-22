export function permalinkUrl({ clientId, flowId, ...params }) {
  const url = new URL(process.env.REACT_APP_SIGNUP_URL);
  if (clientId) {
    url.searchParams.append('merchantToken', clientId);
  }
  if (flowId) {
    url.searchParams.append('flowId', flowId);
  }
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, JSON.stringify(value));
  });
  return url.toJSON();
}
