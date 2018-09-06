import http from './http'

export function signin(credentials) {
  return http.post('/auth/merchant', credentials).then(({ data }) => data)
}
