import { Loadable } from 'models/Loadable.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';

export const TEMPLATES_STORE_KEY = 'templates';

export enum TemplatesActionGroup {
  createTemplate = 'CREATE_TEMPLATE',
}

export const types: TypesSequence = {
  CREATE_EMPTY_FLOW: 'CREATE_EMPTY_FLOW',
  ...createTypesSequence(TemplatesActionGroup.createTemplate),
};
