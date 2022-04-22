import axios, { AxiosResponse } from 'axios';
import { http } from 'lib/client/http';
import { ClientMethodTypes } from 'models/Client.model';

export async function getFileContents(url: string): Promise<AxiosResponse> {
  const headers = await http.getHeaders(ClientMethodTypes.GET, true);
  return axios.get(url, { headers });
}
