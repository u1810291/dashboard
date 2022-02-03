type cardOptions = Record<string, TemplateCardOptions[]>;

export interface TemplateChosenFiltersProps {
  currentValue: cardOptions;
  setCurrentValue:(object: cardOptions) => void;
  initialData: Record<string, []>;
}

export interface TemplateCardProps {
  title: string;
  description: string;
}

export interface TemplateCardOptions {
  _id: number;
  type: string;
  name: string;
  description?: string;
}

export interface CardsData {
  name: string;
  description: string;
}

export interface TempalteFilterProps {
  title: string;
  filterData: TemplateCardOptions[];
  currentFilters: cardOptions;
  setCurrentFilters:(object: cardOptions) => void;
}

export interface TemplateGaleryProps {
  mockTemplates: CardsData[];
}
