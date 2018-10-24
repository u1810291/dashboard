import http, { getAuthHeader } from './http'

export function subscribeToWebhook(token, webhook) {
  return http.post('/v1/webhooks', webhook, {
    headers: { ...getAuthHeader(token) }
  })
}

export function getWebhooks(token) {
  return http.get('/v1/webhooks', {
    headers: { ...getAuthHeader(token) }
  })
}

export function deleteWebhook(token, id) {
  return http.delete(`/v1/webhooks/${id}`, {
    headers: { ...getAuthHeader(token) }
  })
}

export function getWebhooksSamples(token) {
  return http.get('/v1/webhooks/samples', {
    headers: { ...getAuthHeader(token) }
  })
}
