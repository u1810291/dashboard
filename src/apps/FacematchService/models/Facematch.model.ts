export const FACEMATCH_DEFAULT_REJECT_THRESHOLD = 30;
export const FACEMATCH_DEFAULT_APPROVE_THRESHOLD = 70;

export const FACEMATCH_SOURCES_COUNT = 2;

export interface FacematchCheckStepData {
  facematchScore: number;
  sources: {
    type: FacematchSourceTypes;
    url?: string;
  }[];
}

export enum FacematchCheckTypes {
  FacematchCheck = 'facematchCheck',
}

export enum FacematchCheckSettingsTypes {
  FacematchEnabled = 'facematchEnabled',
  FacematchSettings = 'facematchSettings',
  Sources = 'sources',
  RejectThreshold = 'rejectThreshold',
  ApproveThreshold = 'approveThreshold',
  DocumentTypes = 'documentTypes',
  ProductsInGraph = 'productsInGraph',
  CountriesGovChecks = 'countriesGovChecks'
}

export enum FacematchSourceTypes {
  Biometrics = 'biometrics',
  GovermentCheck = 'govermentCheck',
  Document = 'document',
  MerchantDatabase = 'merchantDatabase',
}

export interface IFacematchSourceGovCheckOptions {
  govCheckIds: string[];
}

export interface IFacematchSourceDocumentOptions {
  verificationStepIndex: number;
}
export interface IFacematchSource {
  type: FacematchSourceTypes;
  options?: IFacematchSourceGovCheckOptions | IFacematchSourceDocumentOptions;
}

export interface IFacematchFlow {
  sources: IFacematchSource[];
  approveThreshold: number;
  rejectThreshold: number;
}

export interface IFacematchFiltredSource {
  type: FacematchSourceTypes;
  disabled: boolean;
}
