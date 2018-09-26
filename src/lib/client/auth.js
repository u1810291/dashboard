import http from './http'

export function signin(credentials) {
  return http.post('/api/v1/auth', credentials)
}

export function signup(credentials) {
  return http.post('/api/v1/merchants', credentials)
}

export function recovery(credentials) {
  return http.post('/api/v1/auth/recovery', credentials)
}

export function reset(credentials) {
  return http.put('/api/v1/auth/reset-password', credentials)
}