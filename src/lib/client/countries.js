import http, { getAuthHeader } from './http';

export default {
  getCountries(token) {
    return http.get('/v1/countries', {
      headers: { ...getAuthHeader(token) },
    });
  },
};
