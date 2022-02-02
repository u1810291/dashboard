import { createTypesSequence, TypesSequence } from 'state/store.utils';
import * as api from '../api/SolutionCatalog.client';
import { SolutionCatalogActionGroups } from './SolutionCatalog.store';

export const solutionCatalogTypes: TypesSequence = {
  ...createTypesSequence(SolutionCatalogActionGroups.AllTemplates),
};

export const loadTemplates = (filters: []) => async (dispatch) => {
  dispatch({ type: solutionCatalogTypes.ALL_TEMPLATES_REQUEST });
  try {
    const { data } = await api.getTemplates(filters);
    dispatch({ type: solutionCatalogTypes.ALL_TEMPLATES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: solutionCatalogTypes.ALL_TEMPLATES_FAILURE });
    throw error;
  }
};
