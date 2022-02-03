import { http } from 'lib/client/http';
import { IFlow } from 'models/Flow.model';
import { ICreateTemplateResponse, ITemplateMetadata } from '../model/Templates.model';

export function createTemplateRequest(name: string, description: string, metadata: ITemplateMetadata[], flow: IFlow) {
  return http.post<ICreateTemplateResponse>('/api/v1/dashboard/template', { metadata, name, description, flow });
}

export function getMetadataRequest() {
  return http.get<ITemplateMetadata[]>('/api/v1/dashboard/template/metadata/list');
}

export function getTemplateRequest(id: string) {
  return http.get<ICreateTemplateResponse>(`/api/v1/dashboard/template/${id}`);
}
