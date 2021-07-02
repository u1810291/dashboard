import { titleize } from 'inflection';
import { isObjectEmpty } from 'lib/object';
import { getDocumentExtras, VerificationDocument } from 'models/Document.model';
import { FieldTypes } from 'models/Field.model';
import { IdentityStatuses, isChangeableStatus, VerificationStatusDetails } from 'models/Status.model';
import { BiometricSteps, getBiometricExtras } from './Biometric.model';
import { IFlow } from './Flow.model';
import { getIpCheckStep } from './IpCheck.model';
import { getReVerificationStep } from './ReVerification.model';
import { DocumentStepTypes, getStepExtra, StepTypes, VerificationStepTypes } from './Step.model';

export interface PassedVerificationsResponse {
  createdAt: string,
  _id: string,
  flow: {
    _id: string,
    name: string
  },
  verificationStatusDetails: VerificationStatusDetails,
}

export interface PassedVerificationByFlow {
  id: string,
  value: {
    name: string,
    _id: string,
    verifications: PassedVerificationsResponse[],
  }
}

export interface VerificationResponse {
  createdAt: string,
  documents: any[],
  flow: IFlow,
  identity: string,
  inputs: any[],
  steps: any[],
  summary: any,
  verificationStatus: IdentityStatuses,
  _id?: string,
  id?: string,
  metadata: any,
}

/**
 * @deprecated use VerificationResponse in your product
 */
export interface Verification extends VerificationResponse {
  id: string,
  status: IdentityStatuses,
  deviceFingerprint: any,
  biometric: any[],
  shortId: string,
  fullName: string,
  documents: VerificationDocument[],
  isEditable: boolean,
  ipCheck: any,
  duplicateUserDetectionStep: any,
  ageCheck: any,
  premiumAmlWatchlistsMonitoringStep: any,
  reVerification: any,
}

export enum VerificationErrorTypes {
  VerificationNotFound = 'verificationNotFound',
  RequestError = 'requestError',
}

export function getIdentityShortId(id) {
  return (id || '').slice(-6);
}

/**
 * @deprecated use verification data directly in your product
 */
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
    reVerification: getReVerificationStep(verification),
    duplicateUserDetectionStep,
    ageCheck,
    premiumAmlWatchlistsMonitoringStep,
  };
}

export function groupVerificationsByFlow(verifications: PassedVerificationsResponse[]): PassedVerificationByFlow[] {
  if (!Array.isArray(verifications)) {
    return [];
  }

  return verifications.reduce((byFlow, verification) => {
    const flowId = verification?.flow?._id;
    let newFlow = byFlow.find((item) => item?.id === flowId);

    if (!newFlow) {
      newFlow = { id: flowId, value: { ...verification?.flow, verifications: [] } };
      byFlow.push(newFlow);
    }

    newFlow.value.verifications.push(verification);
    return byFlow;
  }, []);
}
