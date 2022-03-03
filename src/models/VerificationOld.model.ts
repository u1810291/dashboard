import { titleize } from 'inflection';
import { isObjectEmpty } from 'lib/object';
import { getDocumentExtras, VerificationDocument, DocumentTypes } from 'models/Document.model';
import { FieldTypes } from 'models/Field.model';
import { IdentityStatuses, isChangeableStatus, VerificationStatusChangeReason } from 'models/Status.model';
import { BiometricSteps, getBiometricExtras } from './Biometric.model';
import { IFlow } from './Flow.model';
import { getIpCheckStep } from './IpCheck.model';
import { getReVerificationStep } from './ReVerification.model';
import { DocumentStepTypes, getStepExtra, StepTypes, VerificationDocStepTypes } from './Step.model';
import { DigitalSignature } from './DigitalSignature.model';

export interface VerificationListItem {
  flowId: string;
  flowName: string;
  identityId: string;
  fullName?: string;
  merchantId: string;
  sourceCreatedAt: string;
  sourceUpdatedAt: string;
  verificationStatus?: IdentityStatuses;
  _id: string;
}

export interface PassedVerificationByFlow {
  flowName: string;
  flowId: string;
  verifications: VerificationListItem[];
}

export interface IVerificationDetails<T> {
  value: T;
  reasonCode: VerificationStatusChangeReason;
  updatedAt: Date;
  updatedBy: null | string;
}

export interface VerificationResponseComputedAge {
  data: number;
}

export interface VerificationResponseComputedDocumentExpired {
  data: {
    [DocumentTypes.NationalId]: boolean;
  };
}

export interface VerificationResponseComputed {
  age: VerificationResponseComputedAge;
  isDocumentExpired: VerificationResponseComputedDocumentExpired;
}

export interface IVerificationResponseSummary {
  fullName: IVerificationDetails<string>;
  dateOfBirth: IVerificationDetails<string>;
}

// LEGACY version. This version is used in old products, identityProfile and FlowBuilder (not to be confused with WorkflowBuilder)
// TODO: @ggrigorev remove this after all merits be adapted for WorkflowBuilder
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface VerificationResponse<StepData = any> {
  createdAt: string;
  documents: any[];
  flow: IFlow;
  identity: string;
  isEditable: boolean; // EXTRAS!
  inputs: any[];
  // steps: IStep<StepData>[];
  steps: any[];
  summary: IVerificationResponseSummary;
  verificationStatus: IdentityStatuses;
  verificationStatusDetails: IVerificationDetails<IdentityStatuses>;
  computed?: VerificationResponseComputed;
  _id?: string;
  id?: string;
  metadata?: any;
  digitalSignature?: DigitalSignature;
  reVerification: any;
  biometric: any;
  duplicateUserDetectionStep: any;
  ageCheck: any;
}

/**
 * @deprecated use VerificationResponse in your product. When the old verification details page is replaced with an identity profile
 * and verification data is created in review mode as in flow builder products, this interface can be removed
 */
export interface VerificationWithExtras extends VerificationResponse {
  id: string;
  status: IdentityStatuses;
  deviceFingerprint: any;
  biometric: any[];
  shortId: string;
  fullName: string;
  documents: VerificationDocument[];
  isEditable: boolean;
  ipCheck: any;
  duplicateUserDetectionStep: any;
  ageCheck: any;
  premiumAmlWatchlistsMonitoringStep: any;
  reVerification: any;
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
export function getVerificationExtras(verification: VerificationResponse, countries): VerificationWithExtras {
  if (!verification || isObjectEmpty(verification)) {
    return null;
  }

  const steps = verification.steps || [];
  const proofOfOwnershipStep = getStepExtra(steps.find((item) => item.id === StepTypes.ProofOfOwnership));
  const documents = getDocumentExtras(verification, countries, proofOfOwnershipStep);
  const fullName = verification?.summary?.fullName?.value || '';

  let duplicateUserDetectionStep;
  let ageCheck;
  let premiumAmlWatchlistsMonitoringStep;
  documents.forEach((doc) => {
    duplicateUserDetectionStep = duplicateUserDetectionStep || doc?.steps?.find((item) => item.id === VerificationDocStepTypes.DuplicateUserValidation);

    const documentsAgeCheck = doc?.steps?.find((item) => item?.id === VerificationDocStepTypes.AgeValidation);
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

export function groupVerificationsByFlow(verifications: VerificationListItem[]): PassedVerificationByFlow[] {
  if (!Array.isArray(verifications)) {
    return [];
  }

  return verifications.reduce((byFlow, verification) => {
    const { flowId, flowName } = verification || {};
    let newFlow = byFlow.find((item) => item?.flowId === flowId);

    if (!newFlow) {
      newFlow = { flowId, flowName, verifications: [] };
      byFlow.push(newFlow);
    }

    newFlow.verifications.push(verification);
    return byFlow;
  }, []);
}
