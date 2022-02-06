export interface CardsOptions {
  name: string;
  description: string;
}
type filterOptions = Record<MetadataType, TemplateFilterOptions[]>;

export interface TemplateChosenFiltersProps {
  currentValue: filterOptions;
  setCurrentValue:(object: filterOptions) => void;
  initialData: Record<MetadataType, []>;
}
export enum MetadataType {
  Country = 'country',
  Industry = 'industry',
}

export interface TemplateCardProps {
  title: string;
  description: string;
}

export interface TemplateFilterOptions {
  _id: string;
  type: MetadataType;
  name: string;
  description?: string;
}

export interface CardsData {
  name: string;
  description: string;
}

export interface TempalteFilterProps {
  title: string;
  filterData: TemplateFilterOptions[];
  currentFilters: filterOptions;
  setCurrentFilters:(object: filterOptions) => void;
}

export interface TemplateGaleryProps {
  mockTemplates: CardsData[];
}

export const MOCK_TEMPLATES: Record<string, CardsOptions[]> = {
  Crypto: [
    {
      name: 'Lending Secured Loan Application',
      description: 'A user applies for a secured loan - the asset (used vehicle) secures the loan.',
    },
    {
      name: 'Crypto Account Opening',
      description: 'A user wants to create account with crypto exchange and look around.',
    },
    {
      name: 'Neobank Credit Card Application',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Neobank Account Opening',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Lending Secured Loan Application',
      description: 'A user applies for a secured loan - the asset (used vehicle) secures the loan.',
    },
    {
      name: 'Crypto Account Opening',
      description: 'A user wants to create account with crypto exchange and look around.',
    },
    {
      name: 'Neobank Credit Card Application',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Neobank Account Opening',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
  ],
  LATAM: [
    {
      name: 'Lending Secured Loan Application',
      description: 'A user applies for a secured loan - the asset (used vehicle) secures the loan.',
    },
    {
      name: 'Crypto Account Opening',
      description: 'A user wants to create account with crypto exchange and look around.',
    },
    {
      name: 'Neobank Credit Card Application',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Neobank Account Opening',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Lending Secured Loan Application',
      description: 'A user applies for a secured loan - the asset (used vehicle) secures the loan.',
    },
    {
      name: 'Crypto Account Opening',
      description: 'A user wants to create account with crypto exchange and look around.',
    },
    {
      name: 'Neobank Credit Card Application',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Neobank Account Opening',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
  ],
  Bank: [
    {
      name: 'Lending Secured Loan Application',
      description: 'A user applies for a secured loan - the asset (used vehicle) secures the loan.',
    },
    {
      name: 'Crypto Account Opening',
      description: 'A user wants to create account with crypto exchange and look around.',
    },
    {
      name: 'Neobank Credit Card Application',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Neobank Account Opening',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Lending Secured Loan Application',
      description: 'A user applies for a secured loan - the asset (used vehicle) secures the loan.',
    },
    {
      name: 'Crypto Account Opening',
      description: 'A user wants to create account with crypto exchange and look around.',
    },
    {
      name: 'Neobank Credit Card Application',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Neobank Account Opening',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
  ],
};
