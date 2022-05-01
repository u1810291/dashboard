import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { SliceNames, TemplatesActionGroup, TemplatesStore } from './Templates.store';

const initialState: TemplatesStore = {
  [SliceNames.MetadataList]: LoadableAdapter.createState([]),
  [SliceNames.CurrentTemplate]: LoadableAdapter.createState(null),
  [SliceNames.Templates]: LoadableAdapter.createState({}),
  // @ts-ignore
  [SliceNames.TemplatesList]: LoadableAdapter.createState({}),
};

export const templatesReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(TemplatesActionGroup.getMetadataList, SliceNames.MetadataList),
  ...LoadableAdapter.createHandlers(TemplatesActionGroup.getTemplate, SliceNames.CurrentTemplate),
  ...LoadableAdapter.createHandlers(TemplatesActionGroup.createTemplate, SliceNames.CurrentTemplate),
  ...LoadableAdapter.createHandlers(TemplatesActionGroup.updateTemplate, SliceNames.CurrentTemplate),
  ...LoadableAdapter.createHandlers(TemplatesActionGroup.getTemplates, SliceNames.Templates),
  ...LoadableAdapter.createHandlers(TemplatesActionGroup.getTemplatesList, SliceNames.TemplatesList),
});
