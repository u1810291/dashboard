import http, { getAuthHeader } from './http'

export function subscribeToWebhook(token, clientId, webhook) {
  return http.post('/v1/webhooks', webhook, {
    headers: { ...getAuthHeader(token) },
    params: { clientId }
  })
}

export function getWebhooks(token, clientId) {
  return http.get('/v1/webhooks', {
    headers: { ...getAuthHeader(token) },
    params: { clientId }
  })
}

export function deleteWebhook(token, clientId, id) {
  return http.delete(`/v1/webhooks/${id}`, {
    headers: { ...getAuthHeader(token) },
    params: { clientId }
  })
}

export function sendWebhook(token, id, data) {
  return http.post(`/v1/identities/${id}/send-webhook`, null, {
    headers: { ...getAuthHeader(token) }
  });
}
