export interface ICreateTemplateResponse {}

export enum TemplateSaveInputsTypes {
  MetamapName = 'metamapName',
  TemplateTitle = 'templateTitle',
  Industries = 'industries',
  Countries = 'countries',
  Description = 'description',
}

export interface ITemplateMetadata {
  _id: string;
  type: string;
  name: string;
  description: string;
}
