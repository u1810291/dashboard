import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_STRIPE_API_URL,
});

export default function createClient(tokenId, name, clientId) {
  return http.post('/client', { tokenId, name, clientId });
}
