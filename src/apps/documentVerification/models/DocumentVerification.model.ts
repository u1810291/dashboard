import { ProductSettings } from 'models/Product.model';
import { get } from 'lodash';

export enum DocumentVerificationSettingTypes {
  DocumentSteps = 'documentSteps',
  OtherSteps = 'otherSteps',
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

export function getSettingByType(settings: ProductSettings<DocumentVerificationSettingTypes>, type: DocumentVerificationSettingTypes) {
  if (!settings || !type) {
    return null;
  }
  return get(settings, `settings.${type}`);
}
