import { createSelector } from 'reselect';
import { SOLUTION_CATALOG_STORE_KEY } from './SolutionCatalog.store';
import { ITemplateMetadata } from 'apps/Templates';

export const selectSolutionCatalogStore = (state) => state[SOLUTION_CATALOG_STORE_KEY];

export const selectAllTemplatesList = createSelector<any, any, ITemplateMetadata>(
  selectSolutionCatalogStore,
  (store) => store.allTemplates,
);
