export interface TemplateFiltersProps {
  currentValue: object;
  setCurrentValue: (object) => void;
  initialData: object;
}

export interface TemplateCardProps {
  title: string;
  description: string;
}

export interface TemplateCardOptions {
  id: number;
  type: string;
  name: string;
  description?: string;
}

