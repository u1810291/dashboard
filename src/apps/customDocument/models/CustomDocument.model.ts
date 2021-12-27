import { CustomDocumentResponse } from 'models/CustomDocument.model';
import { VerificationDocument } from 'models/Document.model';

// TODO: delete when text detection is avaible from vision
export const TEXT_DETECTION_RELEASE = false;

export const MIN_MEDIA_HEIGHT = 600;
export const MIN_MEDIA_WIDTH = 600;

const VALID_NAME_LENGTH = 32;
const VALID_DESCRIPTION_LENGTH = 256;
const VALID_TYPE_LENGTH = 32;

export enum CustomDocumentPageTypes {
  One = 'one',
  Two = 'two',
  Many = 'many',
}

export enum CustomDocumentTemplateTypes {
  Acceptable = 'Acceptable',
  Fake = 'Fake',
}

export const CUSTOM_DOCUMENT_PREFIX = 'custom-';

export enum CustomDocumentSettingsTypes {
    NeededSteps = 'neededSteps',
    RestSteps = 'restSteps',
}

export enum CustomDocumentCheckTypes {
  DocumentReading = 'documentReading',
  TemplateMatching = 'templateMatching',
}

export enum CustomDocumentWizardStepTypes {
  BasicInfo = 'basicInfo',
  MediaUpload = 'mediaUpload',
  AdvancedSettings = 'advancedSettings',
  TemplateMatchingSettings = 'templateMatchingSettings',
  TemplateMatchingTemplateSettings = 'templateMatchingTemplateSettings',
  DocumentReadingSettings = 'documentReadingSettings',
  DocumentReadingFieldSettings = 'documentReadingFieldSettings',
  DocumentReadingFieldOptionSettings = 'documentReadingFieldOptionSettings',
}

export interface CustomVerificationDocument extends VerificationDocument {
  name: string;
  pdf?: string;
}

export function getNumberOfPages(customDocument: Partial<CustomDocumentResponse>): CustomDocumentPageTypes {
  if (customDocument?.isSingleFile) {
    return CustomDocumentPageTypes.Many;
  }

  if (customDocument?.pages > 1) {
    return CustomDocumentPageTypes.Two;
  }

  return CustomDocumentPageTypes.One;
}

export function getCustomDocumentBasicInfoValidation(customDocument: Partial<CustomDocumentResponse>): {
  name: boolean;
  description: boolean;
  type: boolean;
} {
  const regexp = /^[a-zA-Z0-9$@!%*?&#-_^. +]+$/;

  const isNameInvalid = !(customDocument?.name?.length > 0 && customDocument?.name?.length <= VALID_NAME_LENGTH);
  const isDescriptionInvalid = !(customDocument?.description?.length > 0 && customDocument?.description?.length <= VALID_DESCRIPTION_LENGTH);
  const isTypeInvalid = !(customDocument?.type?.length > 7 && customDocument?.type?.length <= VALID_TYPE_LENGTH) || customDocument?.type.replace(CUSTOM_DOCUMENT_PREFIX, '').match(regexp) === null;

  return {
    name: isNameInvalid,
    description: isDescriptionInvalid,
    type: isTypeInvalid,
  };
}
