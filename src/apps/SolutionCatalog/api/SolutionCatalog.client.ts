import { http } from 'lib/client/http';
/* eslint-disable import/no-unresolved */
import Qs from 'qs';
import { CardsOptions, TemplateFilterOptions } from 'apps/SolutionCatalog';

export function getTemplates(filters: TemplateFilterOptions[]) {
  return http.get<Record<string, CardsOptions[]>>('/api/v1/dashboard/template', {
    params: { metadata: filters },
    paramsSerializer(params) {
      return Qs.stringify(params, { arrayFormat: 'indices' });
    },
  });
}
