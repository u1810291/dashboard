import { http } from 'lib/client/http';

export function getCountries() {
  return http.get('/v1/countries');
}

export function getOnlyExistingCountries() {
  return http.get('/v1/countries?existingOnly=1');
}

export function getCountryGeojsons() {
  // TODO @grigorev send params
  return http.get('/v1/countries/geojson?iso2Codes[]=RU');
}
