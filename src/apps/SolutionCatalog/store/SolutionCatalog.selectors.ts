import { createSelector } from 'reselect';
import { Loadable } from 'models/Loadable.model';
import { ICardsOptions } from 'apps/SolutionCatalog';
import { SOLUTION_CATALOG_STORE_KEY, SolutionCatalogStore } from './SolutionCatalog.store';

export const selectSolutionCatalogStore = (state: {SOLUTION_CATALOG_STORE_KEY: SolutionCatalogStore}): SolutionCatalogStore => state[SOLUTION_CATALOG_STORE_KEY];

export const selectAllTemplatesList = createSelector<[typeof selectSolutionCatalogStore], Loadable<Record<string, ICardsOptions[]>>>(
  selectSolutionCatalogStore,
  (store) => store.allTemplates,
);

