import { CardsOptions } from 'apps/SolutionCatalog';
import { Loadable } from 'models/Loadable.model';

export const SOLUTION_CATALOG_STORE_KEY = 'templatesModal';

export enum SolutionCatalogActionGroups {
  AllTemplates = 'ALL_TEMPLATES',
}

export enum SliceNameTypes {
  AllTemplates = 'allTemplates',
}

export interface SolutionCatalogStore {
  [SliceNameTypes.AllTemplates]: Loadable<Record<string, CardsOptions[]>>;
}
