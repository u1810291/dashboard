import { IFlow } from 'models/Flow.model';

export interface ITemplate {
  flow: IFlow;
  _id: string;
  name: string;
  description?: string;
  metadata: ITemplateMetadata[];
  blocked: boolean;
}

export enum TemplateSaveInputsTypes {
  MetamapName = 'metamapName',
  TemplateTitle = 'templateTitle',
  Industries = 'industries',
  Countries = 'countries',
  Description = 'description',
}

export interface saveTemplateOptions {
  edit?: boolean;
}

export interface TemplateSaveInputs {
  [TemplateSaveInputsTypes.TemplateTitle]: string;
  [TemplateSaveInputsTypes.MetamapName]: string;
  [TemplateSaveInputsTypes.Industries]: ITemplateMetadata[];
  [TemplateSaveInputsTypes.Countries]: ITemplateMetadata[];
  [TemplateSaveInputsTypes.Description]: string;
}

export enum MetadataType {
  Country = 'country',
  Industry = 'industry',
}
export interface ITemplateMetadata {
  _id: string;
  type: MetadataType;
  name: string;
  description?: string;
}

export const TEMPLATE_SAVE_FORM_INITIAL_STATE = {
  [TemplateSaveInputsTypes.TemplateTitle]: '',
  [TemplateSaveInputsTypes.MetamapName]: '',
  [TemplateSaveInputsTypes.Industries]: [],
  [TemplateSaveInputsTypes.Countries]: [],
  [TemplateSaveInputsTypes.Description]: '',
};

export function getFiltersOptions(filtersData: ITemplateMetadata[], type: MetadataType): ITemplateMetadata[] {
  const titles = Array.from(new Set(filtersData.map((item) => item.type)));
  const modifiedArray = titles.map((title) => {
    const uniqueOptions = filtersData.filter((item) => item.type === title);
    return { title, data: [...uniqueOptions] };
  });
  const currentFilterValues = modifiedArray.find((result) => result.title === type);
  return currentFilterValues.data;
}

export const templateSaveFormEdit = (currentTemplate) => (
  {
    [TemplateSaveInputsTypes.TemplateTitle]: currentTemplate.name,
    [TemplateSaveInputsTypes.MetamapName]: currentTemplate.flow.name,
    [TemplateSaveInputsTypes.Industries]: getFiltersOptions(currentTemplate.metadata, MetadataType.Industry),
    [TemplateSaveInputsTypes.Countries]: getFiltersOptions(currentTemplate.metadata, MetadataType.Country),
    [TemplateSaveInputsTypes.Description]: currentTemplate.description,
  }
);

export const COUNTRIES_MOCK_DATA: ITemplateMetadata[] = [
  { _id: '0', type: MetadataType.Country, name: 'North America' },
  { _id: '1', type: MetadataType.Country, name: 'South and Central America' },
  { _id: '2', type: MetadataType.Country, name: 'Asia' },
  { _id: '3', type: MetadataType.Country, name: 'Europe' },
  { _id: '4', type: MetadataType.Country, name: 'Africa' },
  { _id: '5', type: MetadataType.Country, name: 'Oceania' },
];

export const INDUSTRIES_MOCK_DATA: ITemplateMetadata[] = [
  { _id: '0', type: MetadataType.Industry, name: 'Work' },
  { _id: '1', type: MetadataType.Industry, name: 'Finance' },
  { _id: '2', type: MetadataType.Industry, name: 'Neobanking' },
  { _id: '3', type: MetadataType.Industry, name: 'Crypto' },
  { _id: '4', type: MetadataType.Industry, name: 'E-signature' },
  { _id: '5', type: MetadataType.Industry, name: 'Identity Verification' },
];
