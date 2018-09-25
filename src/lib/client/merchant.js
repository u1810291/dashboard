import http, { getAuthHeader } from './http'

export function saveConfiguration(token, configurations) {
  return http.patch('/api/v1/merchants', { configurations }, {
    headers: { ...getAuthHeader(token) }
  })
}

export function getMerchant(token) {
  return http.get('/api/v1/merchants', {
    headers: { ...getAuthHeader(token) }
  })
}

export function getIntegrationCode(token) {
  return http.get('/api/v1/merchants/integration-code', {
    headers: { ...getAuthHeader(token) }
  })
}
