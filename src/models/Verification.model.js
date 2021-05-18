import { titleize } from 'inflection';
import { isObjectEmpty } from 'lib/object';
import { FieldTypes } from 'models/Field.model';
import { getDocumentExtras } from 'models/Document.model';
import { BiometricSteps, getBiometricExtras } from './Biometric.model';
import { getIdentityShortId, getIpCheckStep, VerificationStepTypes } from './Identity.model';
import { isChangeableStatus } from './Status.model';
import { DocumentStepTypes, getStepExtra, StepTypes } from './Step.model';

export function getVerificationExtras(verification, countries) {
  if (!verification || isObjectEmpty(verification)) {
    return null;
  }

  const steps = verification.steps || [];
  const proofOfOwnershipStep = getStepExtra(steps.find((item) => item.id === StepTypes.ProofOfOwnership));
  const documents = getDocumentExtras(verification, countries, proofOfOwnershipStep);
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
