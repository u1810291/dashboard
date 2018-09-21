import http from './http'

export function signin(credentials) {
  return http.post('/auth', credentials)
}

export function signup(credentials) {
  return http.post('/merchants', credentials)
}

export function recovery(credentials) {
  return http.post('/auth/recovery', credentials)
}

