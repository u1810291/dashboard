import { CustomDocumentResponse } from 'models/CustomDocument.model';
import { VerificationDocument } from 'models/Document.model';

// TODO: delete when text detection is avaible from vision
export const TEXT_DETECTION_RELEASE = false;

export const MIN_MEDIA_HEIGHT = 600;
export const MIN_MEDIA_WIDTH = 600;

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
