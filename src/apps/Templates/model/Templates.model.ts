import { IFlow } from 'models/Flow.model';

export interface ICreateTemplateResponse {
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
