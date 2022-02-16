import { Loadable } from 'models/Loadable.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';
import { ITemplateMetadata, ITemplate } from '../model/Templates.model';

export const TEMPLATES_STORE_KEY = 'templates';

export enum TemplatesActionGroup {
  createTemplate = 'CREATE_TEMPLATE',
  getMetadataList = 'GET_METADATA_LIST',
  getTemplate = 'GET_TEMPLATE',
  updateTemplate = 'UPDATE_TEMPLATE',
  getTemplates = 'GET_TEMPLATES',
  blockTemplate = 'BLOCK_TEMPLATE',
}

export enum SliceNames {
  MetadataList = 'metadataList',
  CurrentTemplate = 'currentTemplate',
  Templates = 'templates',
}

export interface TemplatesStore {
  [SliceNames.MetadataList]: Loadable<ITemplateMetadata[]>;
  [SliceNames.CurrentTemplate]: Loadable<ITemplate>;
  [SliceNames.Templates]: Loadable<Record<string, ITemplate[]>>;
}

export const types: TypesSequence = {
  ...createTypesSequence(TemplatesActionGroup.createTemplate),
  ...createTypesSequence(TemplatesActionGroup.getMetadataList),
  ...createTypesSequence(TemplatesActionGroup.getTemplate),
  ...createTypesSequence(TemplatesActionGroup.updateTemplate),
  ...createTypesSequence(TemplatesActionGroup.getTemplates),
  ...createTypesSequence(TemplatesActionGroup.blockTemplate),
};
