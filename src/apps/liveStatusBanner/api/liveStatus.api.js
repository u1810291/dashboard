import axios from 'axios';

export function requestStatus() {
  return axios.get('https://xbnd120h6syx.statuspage.io/api/v2/summary.json');
}
