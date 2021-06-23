import { CountrySpecificChecks, DocumentFrontendSteps, DocumentSecuritySteps, DocumentStepTypes, getDocumentStatus, getStepsExtra } from './Step.model';

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

export const DocumentsOrder = [
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

export enum DocumentSides {
  Front = 'front',
  Back = 'back',
}

export enum PhotosOrientations {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export const DocumentSidesOrder = [DocumentSides.Front, DocumentSides.Back];

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

export function getOrderedDocuments(documents) {
  const docs = [...documents];
  docs.sort((first, second) => DocumentTypeWights[first.type] - DocumentTypeWights[second.type]);

  return docs;
}

export function getDocumentExtras(verification, countries, proofOfOwnership) {
  const documents = getOrderedDocuments(verification.documents || []);

  return documents.map((document) => {
    const steps = getStepsExtra(document.steps, verification, countries, document);
    const documentReadingStep = steps.find((step) => step.id === DocumentStepTypes.DocumentReading);

    // @ts-ignore
    const fields = Object.entries(document.fields || {}).map(([id, { value, required }]) => ({
      id,
      value,
      required,
    }));

    const govChecksSteps = steps.filter((step) => CountrySpecificChecks.includes(step.id));
    const securityCheckSteps = steps.filter((step) => DocumentSecuritySteps.includes(step.id));
    const documentFailedCheckSteps = steps.filter((step) => DocumentFrontendSteps.includes(step.id)); // it is FRONTEND logic,
    const premiumAmlWatchlistsStep = steps.find((step) => DocumentStepTypes.PremiumAmlWatchlistsCheck === step.id);

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
      premiumAmlWatchlistsStep,
      documentStatus: getDocumentStatus(allSteps),
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
