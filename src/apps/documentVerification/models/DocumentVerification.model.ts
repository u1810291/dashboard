import { ProductSettings } from 'models/Product.model';
import { get } from 'lodash';
import { DocumentTypes } from 'models/Document.model';

export enum DocumentVerificationSettingTypes {
  DocumentSteps = 'documentSteps',
  DenyUploadRequirement = 'denyUploadRequirement',
  AgeThreshold = 'ageThreshold',
  GrayscaleImage = 'grayscaleImage',
  SimilarImages = 'similarImages',
  DuplicateUserDetection = 'duplicateUserDetection',
  CountryRestriction = 'countryRestriction',
  FacematchThreshold = 'facematchThreshold',
  ProofOfOwnership = 'proofOfOwnership',
}

export type ProductSettingsDocumentVerification = ProductSettings<DocumentVerificationSettingTypes>;

export enum DocumentVerificationCheckTypes {
  DocumentReading = 'documentReading',
  ExpirationDetection = 'expirationDetection',
  TemplateMatching = 'templateMatching',
  AgeThreshold = 'ageThreshold',
  DuplicateUserDetection = 'duplicateUserDetection',
  AlterationDetection = 'alterationDetection',
  Facematch = 'facematch',
}

export type DocumentVerificationConfigSettings = ProductSettings<DocumentVerificationSettingTypes>;

export type SelectedDocuments = Partial<Record<DocumentTypes, boolean>>;

export function getSelectedDocuments(documentStep: DocumentTypes[]): SelectedDocuments {
  if (!documentStep) {
    return null;
  }

  return {
    [DocumentTypes.DrivingLicense]: documentStep.includes(DocumentTypes.DrivingLicense),
    [DocumentTypes.NationalId]: documentStep.includes(DocumentTypes.NationalId),
    [DocumentTypes.Passport]: documentStep.includes(DocumentTypes.Passport),
    [DocumentTypes.ProofOfResidency]: documentStep.includes(DocumentTypes.ProofOfResidency),
  };
}

export function getSettingByType(settings: ProductSettings<DocumentVerificationSettingTypes>, type: DocumentVerificationSettingTypes) {
  if (!settings || !type) {
    return null;
  }
  return get(settings, `settings.${type}`);
}
