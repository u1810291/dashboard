import axios from 'axios';
import http, { getAuthHeader } from './http';

const hubspotApiClient = axios.create({
  baseURL: process.env.REACT_APP_HUBSPOT_API_URL,
});

export function hubspotApiRequest(token, data) {
  http.post('/api/v1/track/contactUpdated', data, {
    headers: { ...getAuthHeader(token) },
  });
}

function getHubspotCookie() {
  const cookies = document.cookie.split('; ');
  let hubspotCookie = '';
  const cookiePrefix = 'hubspotutk=';
  cookies.forEach((cookie) => {
    if (cookie.search(cookiePrefix) !== -1) {
      hubspotCookie = cookie.slice(cookiePrefix.length);
    }
  });
  return hubspotCookie;
}

export function hubspotSubmitForm(formId, data) {
  const portalId = process.env.REACT_APP_HUBSPOT_PORTAL_ID;
  const hubspotCookie = getHubspotCookie();
  const context = { hutk: hubspotCookie };
  const fields = Object.entries(data).map(([key, value]) => ({ name: key, value }));
  hubspotApiClient.post(`/submissions/v3/integration/submit/${portalId}/${formId}`, { context, fields });
}
