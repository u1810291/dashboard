import { HttpClient } from './HttpCilent';

export const http = new HttpClient({
  baseURL: process.env.REACT_APP_API_URL,
});
