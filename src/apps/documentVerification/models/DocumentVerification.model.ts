import { ProductConfig } from 'models/Product.model';

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

export enum DocumentVerificationCheckTypes {
  DocumentReading = 'documentReading',
  ExpirationDetection = 'expirationDetection',
  TemplateMatching = 'templateMatching',
  AgeThreshold = 'ageThreshold',
  DuplicateUserDetection = 'duplicateUserDetection',
  AlterationDetection = 'alterationDetection',
  Facematch = 'facematch',
}

export type DocumentVerificationConfig = ProductConfig<DocumentVerificationSettingTypes, DocumentVerificationCheckTypes>;

export const DocumentVerificationSettingOrder: DocumentVerificationSettingTypes[] = [
  DocumentVerificationSettingTypes.DocumentSteps,
  DocumentVerificationSettingTypes.DenyUploadRequirement,
  DocumentVerificationSettingTypes.AgeThreshold,
  DocumentVerificationSettingTypes.GrayscaleImage,
  DocumentVerificationSettingTypes.SimilarImages,
  DocumentVerificationSettingTypes.DuplicateUserDetection,
  DocumentVerificationSettingTypes.CountryRestriction,
  DocumentVerificationSettingTypes.FacematchThreshold,
  DocumentVerificationSettingTypes.ProofOfOwnership,
];
