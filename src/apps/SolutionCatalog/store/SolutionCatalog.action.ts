import { createTypesSequence, TypesSequence } from 'state/store.utils';
import { ITemplateFilterOptions } from 'apps/SolutionCatalog';
import { IFlow } from 'models/Flow.model';
import { ProductTypes } from 'models/Product.model';
import { selectProductRegistered } from 'apps/Product';
import { flowBuilderProductListForTemplates } from '../model/SolutionCatalog.model';
import * as api from '../api/SolutionCatalog.client';
import { SolutionCatalogActionGroups } from './SolutionCatalog.store';

export const solutionCatalogTypes: TypesSequence = {
  ...createTypesSequence(SolutionCatalogActionGroups.AllTemplates),
};

export const loadTemplates = (filters: ITemplateFilterOptions[]) => async (dispatch, getState) => {
  const registered = selectProductRegistered(getState());
  dispatch({ type: solutionCatalogTypes.ALL_TEMPLATES_UPDATING });

  try {
    const response = await api.getTemplates(filters);
    const withMerits = Object.entries(response.data).map(([key, value]) => {
      const templatesWithMerits = value.map((template) => ({ ...template, meritsList: flowBuilderProductListForTemplates(template.flow, registered) }));
      return [key, templatesWithMerits];
    });
    const responseWithMerits = Object.fromEntries(withMerits);
    dispatch({ type: solutionCatalogTypes.ALL_TEMPLATES_SUCCESS, payload: responseWithMerits, isReset: true });
  } catch (error) {
    dispatch({ type: solutionCatalogTypes.ALL_TEMPLATES_FAILURE });
    throw error;
  }
};
