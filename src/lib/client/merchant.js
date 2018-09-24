import http, { getAuthHeader } from './http'

export function saveConfiguration(token, configurations) {
  return http.patch('/merchants', { configurations }, {
    headers: { ...getAuthHeader(token) }
  })
}

export function getMerchant(token) {
  return http.get('/merchants', {
    headers: { ...getAuthHeader(token) }
  })
}
