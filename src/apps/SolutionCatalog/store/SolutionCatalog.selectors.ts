import { createSelector } from 'reselect';
import { Loadable } from 'models/Loadable.model';
import { SOLUTION_CATALOG_STORE_KEY, SolutionCatalogStore } from './SolutionCatalog.store';
import { CardsOptions } from 'apps/SolutionCatalog';

export const selectSolutionCatalogStore = (state) => state[SOLUTION_CATALOG_STORE_KEY];

export const selectAllTemplatesList = createSelector<any, SolutionCatalogStore, Loadable<Record<string, CardsOptions[]>>>(
  selectSolutionCatalogStore,
  (store) => store.allTemplates,
);
