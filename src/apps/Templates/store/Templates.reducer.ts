import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { SliceNameTypes, TemplatesActionGroup, TemplatesStore } from './Templates.store';

const initialState: TemplatesStore = {
  [SliceNameTypes.MetadataList]: LoadableAdapter.createState([]),
  [SliceNameTypes.CurrentTemplate]: LoadableAdapter.createState(null),
  [SliceNameTypes.Templates]: LoadableAdapter.createState({}),
  // @ts-ignore
  [SliceNameTypes.TemplatesList]: LoadableAdapter.createState({}),
};

export const templatesReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(TemplatesActionGroup.getMetadataList, SliceNameTypes.MetadataList),
  ...LoadableAdapter.createHandlers(TemplatesActionGroup.getTemplate, SliceNameTypes.CurrentTemplate),
  ...LoadableAdapter.createHandlers(TemplatesActionGroup.createTemplate, SliceNameTypes.CurrentTemplate),
  ...LoadableAdapter.createHandlers(TemplatesActionGroup.updateTemplate, SliceNameTypes.CurrentTemplate),
  ...LoadableAdapter.createHandlers(TemplatesActionGroup.getTemplates, SliceNameTypes.Templates),
  ...LoadableAdapter.createHandlers(TemplatesActionGroup.getTemplatesList, SliceNameTypes.TemplatesList),
});
