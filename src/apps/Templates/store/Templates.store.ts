import { Loadable } from 'models/Loadable.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';
import { ITemplateMetadata } from '../model/Templates.model';

export const TEMPLATES_STORE_KEY = 'templates';

export enum TemplatesActionGroup {
  createTemplate = 'CREATE_TEMPLATE',
  getMetadataList = 'GET_METADATA_LIST'
}

export enum SliceNames {
  MetadataList = 'metadataList',
}

export interface TemplatesStore {
  [SliceNames.MetadataList]: Loadable<ITemplateMetadata[]>;
}

export const types: TypesSequence = {
  CREATE_EMPTY_FLOW: 'CREATE_EMPTY_FLOW',
  ...createTypesSequence(TemplatesActionGroup.createTemplate),
  ...createTypesSequence(TemplatesActionGroup.getMetadataList),
};
