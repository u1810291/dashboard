import { http } from 'lib/client/http';
import Qs from 'qs';
import { ICardsOptions, ITemplateFilterOptions } from 'apps/SolutionCatalog';

export function getTemplates(filters: ITemplateFilterOptions[]) {
  return http.get<Record<string, ICardsOptions[]>>('/api/v1/dashboard/template', {
    params: { metadata: filters },
    paramsSerializer(params) {
      return Qs.stringify(params, { arrayFormat: 'indices' });
    },
  });
}
