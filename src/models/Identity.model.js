import { titleize } from 'inflection';
import { get } from 'lodash';
import { getDocumentExtras } from 'models/Document.model';
import moment from 'moment';

export const IdentityStatuses = {
  verified: 'verified',
  reviewNeeded: 'reviewNeeded',
  rejected: 'rejected',
};

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

export function getIdentityExtras(identity) {
  return {
    liveness: getLivenessExtras(identity),
    shortId: (identity.id || '').slice(-6),
    fullName: titleize(identity.fullName || ''),
    dateCreated: moment(identity.dateCreated).local().format('DD MMM, YYYY HH:mm'),
    documents: getDocumentExtras(identity),
  };
}
