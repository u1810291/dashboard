export interface TemplateChosenFiltersProps {
  currentValue: Record<string, TemplateCardOptions[]>;
  setCurrentValue: (object:Record<string, TemplateCardOptions[]>) => void;
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
  currentFilters: Record<string, TemplateCardOptions[]>;
  setCurrentFilters:(object:Record<string, TemplateCardOptions[]>) => void;
}

export interface TemplateGaleryProps {
  mockTemplates: CardsData[];
}
