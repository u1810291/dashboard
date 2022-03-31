import { Loadable } from 'models/Loadable.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';
import { ITemplateMetadata, ITemplate, ITemplatesList } from '../model/Templates.model';

export const TEMPLATES_STORE_KEY = 'templates';

export enum TemplatesActionGroup {
  createTemplate = 'CREATE_TEMPLATE',
  getMetadataList = 'GET_METADATA_LIST',
  getTemplate = 'GET_TEMPLATE',
  getTemplatesList = 'GET_TEMPLATES_LIST',
  updateTemplate = 'UPDATE_TEMPLATE',
  getTemplates = 'GET_TEMPLATES',
  blockTemplate = 'BLOCK_TEMPLATE',
  toggleTemplate = 'TOGGLE_TEMPLATE',
}

export enum SliceNames {
  MetadataList = 'metadataList',
  CurrentTemplate = 'currentTemplate',
  Templates = 'templates',
  TemplatesList = 'templatesList',
}

export interface TemplatesStore {
  [SliceNames.MetadataList]: Loadable<ITemplateMetadata[]>;
  [SliceNames.CurrentTemplate]: Loadable<ITemplate>;
  [SliceNames.Templates]: Loadable<Record<string, ITemplate[]>>;
  [SliceNames.TemplatesList]: Loadable<ITemplatesList>;
}

export const types: TypesSequence = {
  ...createTypesSequence(TemplatesActionGroup.createTemplate),
  ...createTypesSequence(TemplatesActionGroup.getMetadataList),
  ...createTypesSequence(TemplatesActionGroup.getTemplate),
  ...createTypesSequence(TemplatesActionGroup.updateTemplate),
  ...createTypesSequence(TemplatesActionGroup.getTemplates),
  ...createTypesSequence(TemplatesActionGroup.blockTemplate),
  ...createTypesSequence(TemplatesActionGroup.getTemplatesList),
  ...createTypesSequence(TemplatesActionGroup.toggleTemplate),
};
