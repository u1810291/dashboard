import { GovCheckIStep, parseExpandedGovCheck } from 'apps/GovCheck';
import { CustomDocumentType } from './CustomDocument.model';
import { CountrySpecificChecks, DocumentFrontendSteps, DocumentSecuritySteps, DocumentStepTypes, getComputedSteps, getDocumentStatus, getReaderFrontendSteps, getStepsExtra, IStep, StepStatus, IPremiumAmlWatchlistStepData } from './Step.model';

export interface Document {
  country: string;
  // fields: {fullName: {…}, emissionDate: {…}, documentNumber: {…}, dateOfBirth: {…}, expirationDate: {…}, …}
  photos: string[];
  region?: string;
  steps: any[];
  type: DocumentTypes;
}

export enum DocumentTypes {
  Passport = 'passport',
  NationalId = 'national-id',
  DrivingLicense = 'driving-license',
  ProofOfResidency = 'proof-of-residency',
}

export enum NationalIdTypes {
  VIN = 'VIN',
  NIN = 'NIN',
  BVN = 'BVN',
}

export enum FieldFormat {
  date = 'date',
}

export interface DocumentField {
  id: string;
  format?: FieldFormat;
  label: string;
  required: boolean;
  value: string;
}

export type DocumentReadingStep = IStep<Record<string, DocumentField>>;

export type PremiumAmlWatchlistStep = IStep<IPremiumAmlWatchlistStepData>;

export type VerificationDocumentTypes = DocumentTypes | CustomDocumentType;

export interface VerificationDocument {
  country: string;
  fields: DocumentField[];
  region: any;
  steps: IStep[];
  type: VerificationDocumentTypes;
  documentReadingStep: DocumentReadingStep;
  securityCheckSteps: IStep<null>[];
  govChecksSteps: GovCheckIStep[];
  documentFailedCheckSteps: IStep[];
  premiumAmlWatchlistsStep: PremiumAmlWatchlistStep;
  watchlistsStep: IStep;
  documentStatus: StepStatus;
  areTwoSides: boolean;
  documentSides: typeof DocumentSidesOrder;
  onReading: boolean;
  photos: string[];
  documentImages?: string[];
  checks: IStep[];
  isSanctioned: boolean;
  proofOfOwnership: any;
  customDocumentStep: IStep;
  duplicateUserDetectionStep?: IStep;
  ageCheck?: IStep;
  name?: string;
}

export const byDocumentTypes = [
  { id: DocumentTypes.Passport },
  { id: DocumentTypes.DrivingLicense },
  { id: DocumentTypes.NationalId },
  { id: DocumentTypes.ProofOfResidency },
];

export const DocumentListOrdered: DocumentTypes[] = [
  DocumentTypes.Passport,
  DocumentTypes.NationalId,
  DocumentTypes.DrivingLicense,
  DocumentTypes.ProofOfResidency,
];

export const DocumentTypeWights = {
  [DocumentTypes.Passport]: 1,
  [DocumentTypes.NationalId]: 2,
  [DocumentTypes.DrivingLicense]: 3,
  [DocumentTypes.ProofOfResidency]: 4,
};

export enum PhotosOrientations {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum DocumentSides {
  Front = 'front',
  Back = 'back',
}

export const DocumentSidesOrder: DocumentSides[] = [
  DocumentSides.Front,
  DocumentSides.Back,
];

export const DocumentCountrySanctionList = [
  'AF',
  'BY',
  'BI',
  'CF',
  'CI',
  'CU',
  'CD',
  'CY',
  'ER',
  'FJ',
  'GQ',
  'HT',
  'KG',
  'IR',
  'IQ',
  'LA',
  'LB',
  'LK',
  'LY',
  'ML',
  'MR',
  'NI',
  'KP',
  'PG',
  'PS',
  'RW',
  'SO',
  'SD',
  'SY',
  'UA',
  'RU',
  'TM',
  'YE',
  'VE',
  'ZW',
];

export function getPhotosOrientation(photo) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = photo;
    img.onload = function successCallback() {
      resolve(img.width > img.height
        ? PhotosOrientations.Horizontal
        : PhotosOrientations.Vertical);
    };
    img.onerror = function errorCallback(e) {
      reject(e);
    };
  });
}

export function getDocumentSideLabel(side) {
  return `identity.document.photo.${side}.title`;
}

export function isDocumentWithTwoSides(documentType) {
  return [DocumentTypes.DrivingLicense, DocumentTypes.NationalId].includes(documentType);
}

export function isCustomDocument(documentType: DocumentTypes | string): boolean {
  switch (documentType) {
    case DocumentTypes.DrivingLicense:
    case DocumentTypes.NationalId:
    case DocumentTypes.Passport:
    case DocumentTypes.ProofOfResidency:
      return false;

    default:
      return true;
  }
}

export function getOrderedDocuments(documents) {
  const docs = [...documents];
  docs.sort((first, second) => DocumentTypeWights[first.type] - DocumentTypeWights[second.type]);

  return docs;
}

export function fillAllPhotosInDocument<T>(documents: VerificationDocument[], value: T): T[][] {
  return documents?.map((doc) => doc.photos.map(() => value));
}

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 */
export function getDocumentExtras(verification, countries, proofOfOwnership): VerificationDocument[] {
  const documents = getOrderedDocuments(verification.documents || []);

  return documents.map((document) => {
    const steps = getStepsExtra(document.steps, verification, countries, document);
    const documentReadingStep = steps.find((step) => step.id === DocumentStepTypes.DocumentReading);
    const readerStep = getReaderFrontendSteps(documentReadingStep);
    const computedStep = getComputedSteps(documentReadingStep, verification, document);
    const filteredSteps = steps.filter((step) => [
      ...DocumentSecuritySteps,
      ...DocumentFrontendSteps].includes(step.id));

    const allDocumentVerificationSteps = [
      ...filteredSteps,
      ...readerStep,
      ...computedStep,
    ];

    // @ts-ignore
    const fields = Object.entries(document.fields || {}).map(([id, { value, required }]) => ({
      id,
      value,
      required,
    }));

    const isSkipped = steps.some((step) => step.checkStatus === StepStatus.Skipped);
    const govChecksSteps = steps.filter((step) => CountrySpecificChecks.includes(step.id)).map((step) => parseExpandedGovCheck(step)).flat();
    const securityCheckSteps = steps.filter((step) => DocumentSecuritySteps.includes(step.id));
    const documentFailedCheckSteps = steps.filter((step) => DocumentFrontendSteps.includes(step.id)); // it is FRONTEND logic,
    const premiumAmlWatchlistsStep = steps.find((step) => DocumentStepTypes.PremiumAmlWatchlistsCheck === step.id);
    const watchlistsStep = steps?.find((item) => item?.id === DocumentStepTypes.Watchlists);
    const customDocumentStep = steps?.find((step) => DocumentStepTypes.TemplateMatching === step.id);

    const allSteps = [...documentFailedCheckSteps, ...securityCheckSteps, ...govChecksSteps];
    if (premiumAmlWatchlistsStep) {
      allSteps.push(premiumAmlWatchlistsStep);
    }

    return {
      ...document,
      steps,
      fields,
      documentReadingStep,
      securityCheckSteps,
      govChecksSteps,
      documentFailedCheckSteps,
      customDocumentStep,
      premiumAmlWatchlistsStep,
      watchlistsStep,
      documentStatus: isSkipped ? StepStatus.Skipped : getDocumentStatus(allDocumentVerificationSteps),
      areTwoSides: isDocumentWithTwoSides(document.type),
      documentSides: DocumentSidesOrder,
      onReading: documentReadingStep?.status < 200,
      photos: document.photos || [],
      checks: steps.filter((step) => DocumentSecuritySteps.includes(step.id)),
      isSanctioned: DocumentCountrySanctionList.includes(document.country),
      proofOfOwnership: proofOfOwnership?.data?.documentType === document.type ? proofOfOwnership : null,
    };
  });
}

export function getDocumentsWithoutCustomDocument(data: VerificationDocument[]): VerificationDocument[] {
  return data?.filter((item) => !item.type.startsWith('custom-'));
}
