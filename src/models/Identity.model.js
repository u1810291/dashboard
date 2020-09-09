import { titleize } from 'inflection';
import { get } from 'lodash';
import { getDocumentExtras } from 'models/Document.model';
import moment from 'moment';
import { getLivenessExtras } from './Biometric.model';
import { getIpCheckUrl } from './IpCheck.model';

export const VerificationStepTypes = {
  IpValidation: 'ip-validation',
};

export const IdentityStatuses = {
  verified: 'verified',
  reviewNeeded: 'reviewNeeded',
  rejected: 'rejected',
  deleted: 'deleted',
  pending: 'pending',
  running: 'running',
  unknown: 'unknown',
};

export const DEFAULT_STATUS_COLOR = '#ADADAD';

export const IdentityStatusesMap = [
  {
    id: IdentityStatuses.verified,
    color: 'success.main',
    isChangeable: true,
    isExplanation: true,
    isFilterable: true,
  },
  {
    id: IdentityStatuses.reviewNeeded,
    color: 'warning.main',
    isChangeable: true,
    isExplanation: true,
    isFilterable: true,
  },
  {
    id: IdentityStatuses.running,
    color: DEFAULT_STATUS_COLOR,
    isChangeable: false,
    isExplanation: true,
  },
  {
    id: IdentityStatuses.rejected,
    color: 'error.main',
    isChangeable: true,
    isExplanation: true,
    isFilterable: true,
  },
  {
    id: IdentityStatuses.pending,
    color: 'text.secondary',
    style: 'threedots',
    isChangeable: false,
    isExplanation: false,
  },
  {
    id: IdentityStatuses.deleted,
    color: DEFAULT_STATUS_COLOR,
    isChangeable: false,
    isExplanation: false,
  },
];

export function getExplanationStatuses() {
  return IdentityStatusesMap.filter((item) => item.isExplanation);
}

export function getFilterStatuses() {
  return IdentityStatusesMap.filter((item) => item.isFilterable);
}

export function getStatusById(status) {
  return IdentityStatusesMap.find((item) => item.id === status);
}

export function isChangeableStatus(status) {
  const founded = getStatusById(status);
  return !!founded && founded.isChangeable;
}

export function getIdentityStatusLabel(status) {
  return `statuses.${status}`;
}

export function getIdentityStatusDescription(status) {
  return `statuses.${status}.description`;
}

export function getIdentityShortId(id) {
  return (id || '').slice(-6);
}

export function getIpCheckStep(identity) {
  const steps = get(identity, '_embedded.verification.steps') || [];
  const step = steps.find((item) => item.id === VerificationStepTypes.IpValidation);

  if (!step) {
    return null;
  }

  if (!step.error && step.data) {
    step.data.mapUrl = getIpCheckUrl(step.data);
  }

  return step;
}

export function getIdentityExtras(identity) {
  if (!identity) {
    return null;
  }

  return {
    ...identity,
    liveness: getLivenessExtras(identity),
    shortId: getIdentityShortId(identity.id),
    fullName: titleize(identity.fullName || ''),
    // TODO @dkchv: overrided
    dateCreated: moment(identity.dateCreated).local().format('DD MMM, YYYY HH:mm'),
    documents: getDocumentExtras(identity),
    isEditable: isChangeableStatus(identity.status),
    ipCheck: getIpCheckStep(identity),
  };
}
