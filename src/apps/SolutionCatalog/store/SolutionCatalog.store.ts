export const SOLUTION_CATALOG_STORE_KEY = 'templatesModal';

export enum SolutionCatalogActionGroups {
  AllTemplates = 'ALL_TEMPLATES',
}

export enum SliceNames {
  AllTemplates = 'allTemplates',
}

export interface SolutionCatalogStore {
  [SliceNames.AllTemplates]: object;
}
