import { http } from 'lib/client/http';

export function signin(credentials) {
  return http.post('/api/v1/auth', credentials, null, false);
}

export function signup(credentials) {
  return http.post('/api/v1/merchants', credentials, null, false);
}

export function recovery(credentials) {
  return http.post('/api/v1/auth/recovery', credentials, null, false);
}

export function reset(credentials) {
  return http.put('/api/v1/auth/reset-password', credentials, null, false);
}

export function changePassword(credentials) {
  return http.put('/api/v1/users/change-password', credentials);
}
