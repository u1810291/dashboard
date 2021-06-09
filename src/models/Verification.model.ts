import { titleize } from 'inflection';
import { isObjectEmpty } from 'lib/object';
import { FieldTypes } from 'models/Field.model';
import { getDocumentExtras } from 'models/Document.model';
import { IdentityStatuses, isChangeableStatus } from 'models/Status.model';
import { BiometricSteps, getBiometricExtras } from './Biometric.model';
import { getIdentityShortId, getIpCheckStep, VerificationStepTypes } from './Identity.model';
import { DocumentStepTypes, getStepExtra, StepTypes } from './Step.model';

// TODO @vladislav.snimshchikov: expand and refine types in the future

export interface VerificationResponse{
  createdAt: string,
  documents: Array<any>,
  flow: any,
  identity: string,
  inputs: Array<any>,
  steps: Array<any>,
  summary: any,
  verificationStatus: IdentityStatuses,
  _id?: string,
  id?: string,
}

export interface Verification extends VerificationResponse{
  id: string,
  status: IdentityStatuses,
  deviceFingerprint: any,
  biometric: Array<any>,
  shortId: string,
  fullName: string,
  documents: Array<any>,
  isEditable: boolean,
  ipCheck: any,
  duplicateUserDetectionStep:any,
  ageCheck: any,
  premiumAmlWatchlistsMonitoringStep: any,
}

export function getVerificationExtras(verification: VerificationResponse, countries): Verification {
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

  // TODO @vladislav.snimshchikov: delete this properties after old Identity page will be deleted and pdf will be adapted for new Verification structure
  const status = verification?.verificationStatus;
  const id = verification?.id || verification?._id;

  return {
    ...verification,
    id,
    status,
    deviceFingerprint,
    biometric: getBiometricExtras(steps?.filter((item) => BiometricSteps.includes(item?.id))),
    shortId: getIdentityShortId(verification?.identity),
    fullName: titleize(fullName),
    documents,
    isEditable: isChangeableStatus(status),
    ipCheck: getIpCheckStep(steps),
    duplicateUserDetectionStep,
    ageCheck,
    premiumAmlWatchlistsMonitoringStep,
  };
}
