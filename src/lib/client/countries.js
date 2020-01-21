import { http } from './http';

export function getCountries() {
  return http.get('/v1/countries');
}
