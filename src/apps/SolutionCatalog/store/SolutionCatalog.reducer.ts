import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { SolutionCatalogActionGroups, SolutionCatalogStore, SliceNames } from './SolutionCatalog.store';

const initialState: SolutionCatalogStore = {
  [SliceNames.AllTemplates]: LoadableAdapter.createState({}),
};

export const solutionCatalogReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(SolutionCatalogActionGroups.AllTemplates, SliceNames.AllTemplates),
});
