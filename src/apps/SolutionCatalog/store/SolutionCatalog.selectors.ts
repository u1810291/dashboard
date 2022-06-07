import { selectLoadableValue, selectModelValue } from 'lib/loadable.selectors';
import { createSelector } from 'reselect';
import { Loadable } from 'models/Loadable.model';
import { ICardsOptions } from 'apps/SolutionCatalog';
import { SOLUTION_CATALOG_STORE_KEY, SolutionCatalogStore } from './SolutionCatalog.store';

export const selectSolutionCatalogStore = (state: {SOLUTION_CATALOG_STORE_KEY: SolutionCatalogStore}): SolutionCatalogStore => state[SOLUTION_CATALOG_STORE_KEY];

export const selectAllTemplatesListModel = createSelector<[typeof selectSolutionCatalogStore], Loadable<Record<string, ICardsOptions[]>>>(
  selectSolutionCatalogStore,
  (store) => store.allTemplates,
);

export const selectAllTemplatesListOrdered = createSelector<[typeof selectAllTemplatesListModel], Record<string, ICardsOptions[]>>(
  selectAllTemplatesListModel,
  selectModelValue((value: Record<string, ICardsOptions[]>) => {
    const sortedValue = Object.entries(value).map((card) => [card[0], card[1].sort((a, b) => a.name.localeCompare(b.name))]);
    return Object.fromEntries(sortedValue);
  }),
);

