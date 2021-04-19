import { titleize } from 'inflection';
import { getFileContents } from 'lib/client/checks';
import { get } from 'lodash';
import { getDocumentExtras } from 'models/Document.model';
import { BiometricSteps, getBiometricExtras } from './Biometric.model';
import { getIpCheckUrl } from './IpCheck.model';
import { Routes } from './Router.model';
import { isChangeableStatus } from './Status.model';
import { DocumentStepTypes, getStepExtra, StepTypes, VerificationPatternTypes } from './Step.model';

export const VerificationStepTypes = {
  AgeValidation: 'age-check',
  IpValidation: 'ip-validation',
  DuplicateUserValidation: 'duplicate-user-detection',
};

export const VerificationSummaryTitleTypes = {
  document: 'document',
  additional: 'additional',
  biometric: 'biometric',
  device: 'device',
};

export const OrderDirections = {
  asc: 'asc',
  desc: 'desc',
};

export const OrderDirectionsNum = {
  asc: '-1',
  desc: '1',
};

export const OrderKeyTypes = {
  dateCreated: 'dateCreated',
  fullName: 'fullName',
  verificationFlow: 'verificationFlow',
  status: 'status',
};

export function getIdentityShortId(id) {
  return (id || '').slice(-6);
}

export const tableColumnsData = [
  {
    id: OrderKeyTypes.fullName,
    isSortable: true,
  },
  {
    id: OrderKeyTypes.verificationFlow,
  },
  {
    id: OrderKeyTypes.dateCreated,
    isSortable: true,
  },
  {
    id: OrderKeyTypes.status,
    isSortable: true,
  },
];

export function getIpCheckStep(steps) {
  const step = steps.find((item) => item.id === VerificationPatternTypes.IpValidation);

  if (!step) {
    return null;
  }

  if (!step.error && step.data) {
    step.data.mapUrl = getIpCheckUrl(step.data);
  }

  return step;
}

export function getIdentityExtras(identity, countries) {
  if (!identity) {
    return null;
  }

  const steps = get(identity, '_embedded.verification.steps') || [];
  const pooStep = getStepExtra(steps.find((item) => item.id === StepTypes.ProofOfOwnership));
  const documents = getDocumentExtras(identity, countries, pooStep);

  let duplicateUserDetectionStep;
  let ageCheck;
  let premiumAmlWatchlistsMonitoringStep;
  documents.forEach((doc) => {
    duplicateUserDetectionStep = duplicateUserDetectionStep || doc.steps.find((item) => item.id === VerificationPatternTypes.DuplicateUserValidation);
    const documentsAgeCheck = doc.steps.find((item) => item.id === VerificationPatternTypes.AgeValidation);
    ageCheck = ageCheck?.error || !documentsAgeCheck ? ageCheck : documentsAgeCheck;

    const premiumAmlWatchlistsMonitoring = doc.steps.find((item) => item.id === DocumentStepTypes.PremiumAmlWatchlistsCheck);
    premiumAmlWatchlistsMonitoringStep = premiumAmlWatchlistsMonitoringStep || premiumAmlWatchlistsMonitoring?.data?.isMonitoringAvailable;
  });

  return {
    ...identity,
    biometric: getBiometricExtras(steps.filter((item) => BiometricSteps.includes(item.id))),
    fullName: titleize(identity.fullName || ''),
    documents,
    isEditable: isChangeableStatus(identity.status),
    ipCheck: getIpCheckStep(steps),
    duplicateUserDetectionStep,
    ageCheck,
    premiumAmlWatchlistsMonitoringStep,
    digitalSignature: get(identity, '_embedded.digitalSignature'),
    deviceFingerprint: get(identity, '_embedded.verification.deviceFingerprint'),
  };
}

export function getGoBackToListLink(location) {
  if (location.state?.from?.startsWith(Routes.list.root)) {
    return location.state.from;
  } else {
    return Routes.list.root;
  }
}

export function getDownloadableFileName(verification) {
  if (!verification) {
    return null;
  }
  const flowName = get(verification, 'flow.name', null);
  const { id, fullName: name } = verification;
  return `${flowName?.replaceAll(' ', '_').concat('_')}${name ? name.replaceAll(' ', '_') : id}`;
}

export async function getNom151FileContent(digitalSignatureData = {}) {
  let fileContent;
  try {
    const file = await getFileContents(digitalSignatureData.publicUrl);
    fileContent = file?.data || digitalSignatureData.publicUrl;
  } catch {
    fileContent = digitalSignatureData.publicUrl;
  }
  return fileContent;
}
