import { createTypesSequence, TypesSequence } from 'state/store.utils';
import { ITemplateFilterOptions } from 'apps/SolutionCatalog';
import * as api from '../api/SolutionCatalog.client';
import { SolutionCatalogActionGroups } from './SolutionCatalog.store';

export const solutionCatalogTypes: TypesSequence = {
  ...createTypesSequence(SolutionCatalogActionGroups.AllTemplates),
};

export const loadTemplates = (filters: ITemplateFilterOptions[]) => async (dispatch) => {
  dispatch({ type: solutionCatalogTypes.ALL_TEMPLATES_UPDATING });

  try {
    const response = await api.getTemplates(filters);
    dispatch({ type: solutionCatalogTypes.ALL_TEMPLATES_SUCCESS, payload: response.data, isReset: true });
  } catch (error) {
    dispatch({ type: solutionCatalogTypes.ALL_TEMPLATES_FAILURE });
    throw error;
  }
};
