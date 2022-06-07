import { IFlow } from 'models/Flow.model';
import { ProductTypes } from 'models/Product.model';
import { productManagerService } from 'apps/Product';

export const MAX_NUMBER_OF_MERITS = 10;

export interface ICardsOptions {
  name: string;
  description: string;
  __v?: number;
  _id: string;
  flow?: IFlow;
  meritsList?: ProductTypes[];
  metadata: IMetadataOptions[];
  handleCardClick: (id: string) => void;
}

export interface IMetadataOptions {
  name: string;
  type: string;
  _id: string;
}

type filterOptions = Record<MetadataType, ITemplateFilterOptions[]>;

export interface ITemplateChosenFiltersProps {
  currentValue: filterOptions;
  setCurrentValue: (object: filterOptions) => void;
  initialData: Record<MetadataType, []>;
}
export enum MetadataType {
  Industry = 'industry',
  Country = 'country',
}

export interface ITemplateFilterOptions {
  _id: string;
  type: MetadataType;
  name: string;
  description?: string;
}

export interface IModifiedFiltersOptions {
  title: MetadataType;
  data: ITemplateFilterOptions[];
}

export interface ICardsData {
  name: string;
  description: string;
  id?: string;
  _id?: string;
  meritsList?: ProductTypes[];
}

export interface ITempalteFilterProps {
  title: string;
  filterData: ITemplateFilterOptions[];
  currentFilters: filterOptions;
  setCurrentFilters: (object: filterOptions) => void;
}

export function getFiltersOptions(filtersData: ITemplateFilterOptions[]): IModifiedFiltersOptions[] {
  const titles = Array.from(new Set(filtersData.map((item) => item.type)));
  return titles.map((title: MetadataType) => {
    const uniqueOptions = filtersData.filter((item) => item.type === title);
    return { title, data: [...uniqueOptions] };
  });
}

export const flowBuilderProductListForTemplates = (flow: IFlow, registered: ProductTypes[]): ProductTypes[] => {
  const activated = registered.filter((item) => {
    const product = productManagerService.getProduct(item);
    if (!product) {
      return false;
    }
    return product.isInFlow(flow);
  });
  const sorted = productManagerService.sortProductTypes(activated);
  return sorted;
};
