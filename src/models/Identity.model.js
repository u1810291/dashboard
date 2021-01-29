import { titleize } from 'inflection';
import { get } from 'lodash';
import { getDocumentExtras } from 'models/Document.model';
import { BiometricSteps, getBiometricExtras } from './Biometric.model';
import { getIpCheckUrl } from './IpCheck.model';
import { Routes } from './Router.model';
import { isChangeableStatus } from './Status.model';
import { DocumentStepTypes } from './Step.model';
import { getFileContents } from '../lib/client/checks';

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

export const OrderKeys = {
  dateCreated: 'dateCreated',
  fullName: 'fullName',
  flowId: 'flowId',
};

export function getIdentityShortId(id) {
  return (id || '').slice(-6);
}

export function getIpCheckStep(steps) {
  const step = steps.find((item) => item.id === VerificationStepTypes.IpValidation);

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
  const documents = getDocumentExtras(identity, countries);

  let duplicateUserDetectionStep;
  let ageCheck;
  let premiumAmlWatchlistsMonitoringStep;
  documents.forEach((doc) => {
    duplicateUserDetectionStep = duplicateUserDetectionStep || doc.steps.find((item) => item.id === VerificationStepTypes.DuplicateUserValidation);

    const documentsAgeCheck = doc.steps.find((item) => item.id === VerificationStepTypes.AgeValidation);
    ageCheck = ageCheck?.error || !documentsAgeCheck ? ageCheck : documentsAgeCheck;

    const premiumAmlWatchlistsMonitoring = doc.steps.find((item) => item.id === DocumentStepTypes.PremiumAmlWatchlistsCheck);
    premiumAmlWatchlistsMonitoringStep = premiumAmlWatchlistsMonitoringStep || premiumAmlWatchlistsMonitoring?.data?.isMonitoringAvailable;
  });

  return {
    ...identity,
    biometric: getBiometricExtras(steps.filter((item) => BiometricSteps.includes(item.id))),
    shortId: getIdentityShortId(identity.id),
    fullName: titleize(identity.fullName || ''),
    // TODO @dkchv: overrided
    documents,
    isEditable: isChangeableStatus(identity.status),
    ipCheck: getIpCheckStep(steps),
    duplicateUserDetectionStep,
    ageCheck,
    premiumAmlWatchlistsMonitoringStep,
    digitalSignature: get(identity, '_embedded.digitalSignature'),
  };
}

export function getGoBackToListLink(location) {
  if (location.state?.from?.startsWith(Routes.list.root)) {
    return location.state.from;
  } else {
    return Routes.list.root;
  }
}

export function getDownloadableFileName(identity) {
  const flowName = get(identity, '_embedded.verification.flow.name', null);
  const { id, fullName: name } = identity;
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
