import { http } from 'lib/client/http';
import { IFlow } from 'models/Flow.model';
import { ITemplate, ITemplateMetadata } from '../model/Templates.model';

export function createTemplateRequest(name: string, description: string, metadata: ITemplateMetadata[], flow: IFlow) {
  return http.post<ITemplate>('/api/v1/dashboard/template', { metadata, name, description, flow });
}

export function getMetadataRequest() {
  return http.get<ITemplateMetadata[]>('/api/v1/dashboard/template/metadata/list');
}

export function getTemplateRequest(id: string) {
  return http.get<ITemplate>(`/api/v1/dashboard/template/${id}`);
}

export function updateTemplateRequest({ id, name, description, flow, metadata }: { id: string; name?: string; description?: string; metadata?: ITemplateMetadata[]; flow?: IFlow }) {
  return http.patch<ITemplate>(`/api/v1/dashboard/template/${id}`, { metadata, name, description, flow });
}

export function getTemplatesRequest() {
  return http.get<ITemplate[]>('/api/v1/dashboard/template');
}

export function blockTemplateRequest(id: string) {
  return http.delete<ITemplate>(`/api/v1/dashboard/template/${id}`);
}
