import { createSelector } from 'reselect';
import { Loadable } from 'models/Loadable.model';
import { CardsOptions } from 'apps/SolutionCatalog';
import { SOLUTION_CATALOG_STORE_KEY, SolutionCatalogStore } from './SolutionCatalog.store';

export const selectSolutionCatalogStore = (state) => state[SOLUTION_CATALOG_STORE_KEY];

export const selectAllTemplatesList = createSelector<any, SolutionCatalogStore, Loadable<Record<string, CardsOptions[]>>>(
  selectSolutionCatalogStore,
  (store) => store.allTemplates,
);
