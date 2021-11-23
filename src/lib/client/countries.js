import { http } from 'lib/client/http';

export function getCountries() {
  return http.get('/api/v1/countries');
}

export function getCountryGeojsons() {
  // TODO @grigorev send params
  return http.get('/api/v1/countries/geojson?iso2Codes[]=RU');
}
