import axios from 'axios';

export function getFileContents(url) {
  return axios.get(url);
}
