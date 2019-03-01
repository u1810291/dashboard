import http, { getAuthHeader } from './http'

export function getCountries(token) {
  return http.get('/v1/countries', {
    headers: { ...getAuthHeader(token) }
  })
}
