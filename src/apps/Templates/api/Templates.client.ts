import { http } from 'lib/client/http';
import { ITemplateMetadata } from '../model/Templates.model';

export function getMetadataRequest() {
  return http.get<ITemplateMetadata[]>('/api/v1/dashboard/template/metadata/list');
}
