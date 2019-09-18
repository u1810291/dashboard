import http, { getAuthHeader } from './http';

export default function hubspotApiRequest(token, data) {
  http.post('/api/v1/track/contactUpdated', data, {
    headers: { ...getAuthHeader(token) },
  });
}
