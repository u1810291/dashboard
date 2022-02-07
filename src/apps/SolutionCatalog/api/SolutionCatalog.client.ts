import { http } from 'lib/client/http';
import { CardsOptions, TemplateFilterOptions } from 'apps/SolutionCatalog';

export function getTemplates(params: TemplateFilterOptions[]) {
  return http.get<Record<string, CardsOptions[]>>('/api/v1/dashboard/template', { params });
}
