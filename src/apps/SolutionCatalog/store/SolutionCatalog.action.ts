import { createTypesSequence, TypesSequence } from 'state/store.utils';
import * as api from '../api/SolutionCatalog.client';
import { SolutionCatalogActionGroups } from './SolutionCatalog.store';
import { TemplateFilterOptions } from 'apps/SolutionCatalog';

export const solutionCatalogTypes: TypesSequence = {
  ...createTypesSequence(SolutionCatalogActionGroups.AllTemplates),
};

export const loadTemplates = (filters: TemplateFilterOptions[]) => async (dispatch) => {
  dispatch({ type: solutionCatalogTypes.ALL_TEMPLATES_UPDATING });

  try {
    const response = await api.getTemplates(filters);
    dispatch({ type: solutionCatalogTypes.ALL_TEMPLATES_SUCCESS, payload: response.data, isReset: true });
  } catch (error) {
    dispatch({ type: solutionCatalogTypes.ALL_TEMPLATES_FAILURE });
    throw error;
  }
};
