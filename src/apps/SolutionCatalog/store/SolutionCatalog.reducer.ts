import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { SolutionCatalogActionGroups, SolutionCatalogStore, SliceNameTypes } from './SolutionCatalog.store';

const initialState: SolutionCatalogStore = {
  [SliceNameTypes.AllTemplates]: LoadableAdapter.createState({}),
};

export const solutionCatalogReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(SolutionCatalogActionGroups.AllTemplates, SliceNameTypes.AllTemplates),
});
