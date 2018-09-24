import http, { getAuthHeader } from './http'

export function subscribeToWebhook(token, webhook) {
  return http.post('/webhooks', webhook, {
    headers: { ...getAuthHeader(token) }
  })
}
