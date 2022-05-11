export interface CardsOptions {
  name: string;
  description: string;
  __v?: number;
  _id: string;
  metadata: metadataOptions[];
  handleCardClick: (id: string) => void;
}

export interface metadataOptions {
  name: string;
  type: string;
  _id: string;
}

type filterOptions = Record<MetadataType, TemplateFilterOptions[]>;

export interface TemplateChosenFiltersProps {
  currentValue: filterOptions;
  setCurrentValue: (object: filterOptions) => void;
  initialData: Record<MetadataType, []>;
}
export enum MetadataType {
  Industry = 'industry',
  Country = 'country',
}

export interface TemplateCardProps {
  title: string;
  description: string;
  id: string;
  handleCardClick: (id: string) => void;
}

export interface TemplateFilterOptions {
  _id: string;
  type: MetadataType;
  name: string;
  description?: string;
}

export interface ModifiedFiltersOptions {
  title: MetadataType;
  data: TemplateFilterOptions[];
}

export interface CardsData {
  name: string;
  description: string;
  id?: string;
  _id?: string;
}

export interface TempalteFilterProps {
  title: string;
  filterData: TemplateFilterOptions[];
  currentFilters: filterOptions;
  setCurrentFilters: (object: filterOptions) => void;
}

export interface TemplateGaleryProps {
  templates: CardsData[];
  handleCardClick: (id: string) => void;
}

export function getFiltersOptions(filtersData: TemplateFilterOptions[]): ModifiedFiltersOptions[] {
  // const titles = Array.from(new Set(filtersData.map((item) => item.type)));
  // TODO: we hide countries filter till next version of onboarding, so now its commented
  const titles = ['country', 'industry'];
  // @ts-ignore
  return titles.map((title: MetadataType) => {
    const uniqueOptions = filtersData.filter((item) => item.type === title);
    return { title, data: [...uniqueOptions] };
  });
}
