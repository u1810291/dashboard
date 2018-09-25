import http, { getAuthHeader } from './http'

export function subscribeToWebhook(token, webhook) {
  return http.post('/v1/webhooks', webhook, {
    headers: { ...getAuthHeader(token) }
  })
}

export function getWebhooks(token) {
  return http.get('/v1/webhooks/samples', {
    headers: { ...getAuthHeader(token) }
  })
}
