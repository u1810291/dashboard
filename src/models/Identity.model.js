import { titleize } from 'inflection';
import { get } from 'lodash';
import { getDocumentExtras } from 'models/Document.model';
import { getIpCheckStep } from 'models/IpCheck.model';
import moment from 'moment';

export const IdentityStatuses = {
  verified: 'verified',
  reviewNeeded: 'reviewNeeded',
  rejected: 'rejected',
  deleted: 'deleted',
  pending: 'pending',
  running: 'running',
  unknown: 'unknown',
};

export const DEFAULT_STATUS_COLOR = 'text.secondary';

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

export const IdentitySteps = {
  liveness: 'liveness',
  selfie: 'selfie',
};

export const IdentityLivenessSteps = [
  IdentitySteps.liveness,
  IdentitySteps.selfie,
];

export function getIdentityStatusLabel(status) {
  return `statuses.${status}`;
}

export function getIdentityStatusDescription(status) {
  return `statuses.${status}.description`;
}

export const IdentityLivenessStatus = {
  Skipped: 'skipped',
  InProgress: 'inProgress',
  Success: 'success',
  Error: 'error',
};

export function getStatusByCode({ status, error }) {
  switch (status) {
    case 0:
      return IdentityLivenessStatus.Skipped;
    case 100:
      return IdentityLivenessStatus.InProgress;
    case 200:
      return error
        ? IdentityLivenessStatus.Error
        : IdentityLivenessStatus.Success;
    default: {
      console.warn('liveness code: status not found, status: ', status, 'error: ', error);
      return null;
    }
  }
}

export function getLivenessExtras(identity) {
  const steps = get(identity, '_embedded.verification.steps') || [];
  const liveness = steps.find((item) => IdentityLivenessSteps.includes(item.id));

  if (!liveness) {
    return null;
  }

  return {
    status: getStatusByCode(liveness),
    videoUrl: get(liveness, 'data.videoUrl'),
    selfieUrl: get(liveness, 'data.selfiePhotoUrl') || get(liveness, 'data.selfieUrl'),
  };
}

export function getIdentityShortId(id) {
  return (id || '').slice(-6);
}

export function getIdentityExtras(identity) {
  return {
    liveness: getLivenessExtras(identity),
    shortId: getIdentityShortId(identity.id),
    fullName: titleize(identity.fullName || ''),
    dateCreated: moment(identity.dateCreated).local().format('DD MMM, YYYY HH:mm'),
    documents: getDocumentExtras(identity),
    isEditable: isChangeableStatus(identity.status),
    ipCheck: getIpCheckStep(identity),
  };
}
