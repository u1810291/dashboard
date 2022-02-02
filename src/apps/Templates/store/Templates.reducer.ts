import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { SliceNames, TemplatesActionGroup, TemplatesStore } from './Templates.store';

const initialState: TemplatesStore = {
  [SliceNames.MetadataList]: LoadableAdapter.createState([]),
};

export const templatesReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(TemplatesActionGroup.getMetadataList, SliceNames.MetadataList),
});
