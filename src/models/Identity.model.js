import { titleize } from 'inflection';
import { get } from 'lodash';
import { getDocumentExtras } from 'models/Document.model';
import { BiometricSteps, getBiometricExtras } from './Biometric.model';
import { getIpCheckUrl } from './IpCheck.model';
import { Routes } from './Router.model';

export const DEFAULT_STATUS_COLOR = '#ADADAD';

export const VerificationStepTypes = {
  IpValidation: 'ip-validation',
  DuplicateUserValidation: 'duplicate-user-detection',
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

export const IdentityStatusesMap = [
  {
    id: IdentityStatuses.verified,
    color: 'success.main',
    textColor: 'primary.contrastText',
    isChangeable: true,
    isExplanation: true,
    isFilterable: true,
  },
  {
    id: IdentityStatuses.reviewNeeded,
    color: 'warning.main',
    textColor: 'common.black90',
    isChangeable: true,
    isExplanation: true,
    isFilterable: true,
  },
  {
    id: IdentityStatuses.rejected,
    color: 'error.main',
    textColor: 'primary.contrastText',
    isChangeable: true,
    isExplanation: true,
    isFilterable: true,
  },
  {
    id: IdentityStatuses.running,
    color: 'common.black50',
    textColor: 'common.black90',
    isChangeable: false,
    isExplanation: true,
    isFilterable: true,
  },
  {
    id: IdentityStatuses.pending,
    color: 'text.secondary',
    textColor: 'common.black90',
    style: 'threedots',
    isChangeable: false,
    isExplanation: false,
  },
  {
    id: IdentityStatuses.deleted,
    color: DEFAULT_STATUS_COLOR,
    textColor: DEFAULT_STATUS_COLOR,
    isChangeable: false,
    isExplanation: false,
  },
];

export const OrderDirections = {
  asc: 'asc',
  desc: 'desc',
};

export const OrderKeys = {
  dateCreated: 'dateCreated',
  fullName: 'fullName',
  flowId: 'flowId',
};

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

export function getIdentityStatusExplanation(status) {
  return `statuses.${status}.explanation`;
}

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
  let duplicateUserCheck;
  documents.forEach((doc) => {
    doc.steps = doc.steps.filter((item) => {
      if (item.id === VerificationStepTypes.DuplicateUserValidation) {
        duplicateUserCheck = item;
        return false;
      }
      return true;
    });
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
    duplicateUserCheck,
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
  return `${flowName.replaceAll(' ', '_')}_${name ? name.replaceAll(' ', '_') : id}`;
}
