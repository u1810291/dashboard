export interface CardsOptions {
  name: string;
  description: string;
}
type filterOptions = Record<MetadataType, TemplateFilterOptions[]>;

export interface TemplateChosenFiltersProps {
  currentValue: filterOptions;
  setCurrentValue: (object: filterOptions) => void;
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

export interface ModifiedFiltersOptions {
  title: MetadataType;
  data: TemplateFilterOptions[];
}

export interface CardsData {
  name: string;
  description: string;
}

export interface TempalteFilterProps {
  title: string;
  filterData: TemplateFilterOptions[];
  currentFilters: filterOptions;
  setCurrentFilters: (object: filterOptions) => void;
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

// TODO:  this function just for example how filtering looks like , until we don't have response from backend
export function filteredArray(dataArray, currentFilters) {
  // @ts-ignore
  if (!currentFilters.industry.length) return dataArray;
  // @ts-ignore
  const chosenIndustry = currentFilters.industry.map((item) => item.name.toLowerCase());
  const filterResults = Object.entries(dataArray).filter(([industry]) => chosenIndustry.includes(industry.toLowerCase()));
  return Object.fromEntries(filterResults);
}

export function getFiltersOptions(filtersData: TemplateFilterOptions[]): ModifiedFiltersOptions[] {
  const titles = Array.from(new Set(filtersData.map((item) => item.type)));
  return titles.map((title) => {
    const uniqueOptions = filtersData.filter((item) => item.type === title);
    return { title, data: [...uniqueOptions] };
  });
}
