import { titleize } from 'inflection';
import { isObjectEmpty } from 'lib/object';
import { FieldTypes } from 'models/Field.model';
import { BiometricSteps, getBiometricExtras } from './Biometric.model';
import { DocumentConfig, DocumentCountrySanctionList, DocumentSidesOrder, isDocumentWithTwoSides } from './Document.model';
import { getIdentityShortId, getIpCheckStep, VerificationStepTypes } from './Identity.model';
import { isChangeableStatus } from './Status.model';
import { CountrySpecificChecks, DocumentFrontendSteps, DocumentSecuritySteps, DocumentStepTypes, getDocumentStatus, getStepsExtra } from './Step.model';

export function getVerificationDocumentExtras(verification, countries) {
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
    };
  });
}

export function getVerificationExtras(verification, countries) {
  if (!verification || isObjectEmpty(verification)) {
    return null;
  }

  const steps = verification.steps || [];
  const documents = getVerificationDocumentExtras(verification, countries);
  const fullName = verification?.summary?.identity?.fullName || '';

  let duplicateUserDetectionStep;
  let ageCheck;
  let premiumAmlWatchlistsMonitoringStep;
  documents.forEach((doc) => {
    duplicateUserDetectionStep = duplicateUserDetectionStep || doc?.steps?.find((item) => item.id === VerificationStepTypes.DuplicateUserValidation);

    const documentsAgeCheck = doc?.steps?.find((item) => item?.id === VerificationStepTypes.AgeValidation);
    ageCheck = ageCheck?.error || !documentsAgeCheck ? ageCheck : documentsAgeCheck;

    const premiumAmlWatchlistsMonitoring = doc?.steps?.find((item) => item?.id === DocumentStepTypes.PremiumAmlWatchlistsCheck);
    premiumAmlWatchlistsMonitoringStep = premiumAmlWatchlistsMonitoringStep || premiumAmlWatchlistsMonitoring?.data?.isMonitoringAvailable;
  });

  const deviceFingerprint = verification?.inputs?.find((input) => input?.id === FieldTypes.ConnectionData)?.data || {};

  return {
    ...verification,
    deviceFingerprint,
    biometric: getBiometricExtras(steps?.filter((item) => BiometricSteps.includes(item?.id))),
    shortId: getIdentityShortId(verification?.identity),
    fullName: titleize(fullName),
    documents,
    isEditable: isChangeableStatus(verification?.status),
    ipCheck: getIpCheckStep(steps),
    duplicateUserDetectionStep,
    ageCheck,
    premiumAmlWatchlistsMonitoringStep,
  };
}
