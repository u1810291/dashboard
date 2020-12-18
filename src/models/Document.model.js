import { cloneDeep, get } from 'lodash';
import { FieldsEmissionCheck, FieldsExpirationCheck, getFieldIsExpired } from './Field.model';
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
    [DocumentStepFrontendChecksTypes.ExpiredDate]: [FieldsExpirationCheck],
  },
  [DocumentTypes.NationalId]: {
    [DocumentStepFrontendChecksTypes.ExpiredDate]: [FieldsExpirationCheck],
  },
  [DocumentTypes.DrivingLicense]: {
    [DocumentStepFrontendChecksTypes.ExpiredDate]: [FieldsExpirationCheck],
  },
  [DocumentTypes.ProofOfResidency]: {
    [DocumentStepFrontendChecksTypes.ExpiredDate]: [FieldsEmissionCheck],
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

export function getDocumentSides(identity, documentIndex) {
  return get(identity, `_embedded.documents[${documentIndex}].metadata.sides`, null);
}

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

function makeEqualOrdersByKey(firstArray = [], secondArray = [], key) {
  const firstArrayCopy = cloneDeep(firstArray);

  if (!secondArray.length) {
    return firstArrayCopy;
  }

  firstArrayCopy.sort((a, b) => {
    const indexOfAInSource = secondArray.findIndex((el) => el[key] === a[key]);
    const indexOfBInSource = secondArray.findIndex((el) => el[key] === b[key]);

    return indexOfAInSource > indexOfBInSource ? 1 : indexOfAInSource < indexOfBInSource ? -1 : 0;
  });

  return firstArrayCopy;
}

export function isDocumentWithTwoSides(documentType) {
  return [DocumentTypes.DrivingLicense, DocumentTypes.NationalId].includes(documentType);
}

export function getDocumentExtras(identity, countries) {
  const documents = get(identity, '_embedded.verification.documents') || [];
  const source = get(identity, '_embedded.documents');

  // make documents order equal to source order to get right metadata about document
  const orderedDocuments = makeEqualOrdersByKey(documents, source, 'type');

  return orderedDocuments.map((document, index) => {
    const steps = getStepsExtra(document.steps, DocumentConfig[document.type], identity, countries, document);
    const documentReadingStep = steps.find((step) => step.id === DocumentStepTypes.DocumentReading);
    const sourceDocument = source.find((item) => item.type === document.type) || {};

    const fields = Object.entries(sourceDocument.fields || {}).map(([id, { value, required }]) => ({
      id,
      value,
      isValid: !getFieldIsExpired({ id, value }, DocumentConfig[document.type][DocumentStepFrontendChecksTypes.ExpiredDate], identity.dateCreated),
      required,
    }));

    const govChecksSteps = steps.filter((step) => CountrySpecificChecks.includes(step.id));
    const securityCheckSteps = steps.filter((step) => DocumentSecuritySteps.includes(step.id));
    const documentFailedCheckSteps = steps.filter((step) => DocumentFrontendSteps.includes(step.id)); // it is FRONTEND logic,
    const complyAdvantageStep = steps.filter((step) => DocumentStepTypes.ComplyAdvantageIntegratedCheck === step.id);

    return {
      ...document,
      steps,
      fields,
      documentReadingStep,
      source: sourceDocument,
      securityCheckSteps,
      govChecksSteps,
      documentFailedCheckSteps,
      complyAdvantageStep,
      documentStatus: getDocumentStatus([...govChecksSteps, ...securityCheckSteps, ...documentFailedCheckSteps, ...complyAdvantageStep]),
      areTwoSides: isDocumentWithTwoSides(document.type),
      documentSides: getDocumentSides(identity, index),
      onReading: documentReadingStep.status < 200,
      photos: document.photos || [],
      checks: steps.filter((step) => DocumentSecuritySteps.includes(step.id)),
      isSanctioned: DocumentCountrySanctionList.includes(document.country),
    };
  });
}

export function getDocumentList() {
  return Object.values(DocumentTypes);
}
