import { http } from 'lib/client/http';
import { IFlow } from 'models/Flow.model';
import { ICreateTemplateResponse, ITemplateMetadata } from '../model/Templates.model';

export function createTemplate(metadata: ITemplateMetadata, name: string, flow: IFlow) {
  return http.post<ICreateTemplateResponse>('/api/v1/template', { metadata, name, flow });
}
