import { createSelector } from 'reselect';
import { SOLUTION_CATALOG_STORE_KEY } from './SolutionCatalog.store';
import { selectCountriesStore } from '../../../state/countries/countries.selectors';

export const selectSolutionCatalogStore = (state) => state[SOLUTION_CATALOG_STORE_KEY];

export const selectAllTemplatesList = createSelector(
  selectCountriesStore,
  (store) => store.allTemplates,
);
