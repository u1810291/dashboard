import axios, { AxiosResponse } from 'axios';
import { IncidentsUnresolvedRequest } from '../models/liveStatus.model';

export function requestUnresolvedIncidents(): Promise<AxiosResponse<IncidentsUnresolvedRequest>> {
  return axios.get<IncidentsUnresolvedRequest>(process.env.REACT_APP_STATUSPAGE_UNRESOLVED_INCIDENTS_LINK);
}
