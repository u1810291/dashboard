import { isDateBetween } from '../lib/date';
import { FieldsEmissionCheck, FieldsExpirationCheck, FieldTypes } from './Field.model';
import { CountrySpecificChecks, DocumentFrontendSteps, DocumentSecuritySteps, DocumentStepFrontendChecksTypes, DocumentStepTypes, getDocumentStatus, getStepsExtra } from './Step.model';

export const DocumentTypes = {
  Passport: 'passport',
  NationalId: 'national-id',
  DrivingLicense: 'driving-license',
  ProofOfResidency: 'proof-of-residency',
};

export const DocumentSides = {
  Front: 'front',
  Back: 'back',
};

export const PhotosOrientations = {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
};

export const DocumentSidesOrder = [DocumentSides.Front, DocumentSides.Back];

export const DocumentConfig = {
  [DocumentTypes.Passport]: {
    checks: {
      [DocumentStepFrontendChecksTypes.ExpiredDate]: [FieldsExpirationCheck],
    },
  },
  [DocumentTypes.NationalId]: {
    checks: {
      [DocumentStepFrontendChecksTypes.ExpiredDate]: [FieldsExpirationCheck],
    },
    transforms: {
      [FieldTypes.ExpirationDate]: [(value, { country, type }) => {
        if (country === 'MX' && type === DocumentTypes.NationalId) {
          // TODO: IDs which expire between Dec 1 2019 and June 5 2021
          //  must be considered valid until June 6 2021.
          const isTolerancePeriodApplicable = isDateBetween(value, '2019-12-01', '2021-06-05');
          if (isTolerancePeriodApplicable) {
            return '2021-06-06';
          }
        }
        return value;
      }],
    },
  },
  [DocumentTypes.DrivingLicense]: {
    checks: {
      [DocumentStepFrontendChecksTypes.ExpiredDate]: [FieldsExpirationCheck],
    },
  },
  [DocumentTypes.ProofOfResidency]: {
    checks: {
      [DocumentStepFrontendChecksTypes.ExpiredDate]: [FieldsEmissionCheck],
    },
  },
};

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
      resolve(this.width > this.height ? PhotosOrientations.Horizontal : PhotosOrientations.Vertical);
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

export function getDocumentExtras(verification, countries, proofOfOwnership) {
  const documents = verification.documents || [];

  return documents.map((document) => {
    const steps = getStepsExtra(document.steps, DocumentConfig[document.type], verification, countries, document);
    const documentReadingStep = steps.find((step) => step.id === DocumentStepTypes.DocumentReading);

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

export function getDocumentList() {
  return Object.values(DocumentTypes);
}
