export const IdentityStatuses = {
  verified: 'verified',
  reviewNeeded: 'reviewNeeded',
  rejected: 'rejected',
  deleted: 'deleted',
  pending: 'pending',
  running: 'running',
  postponed: 'postponed',
  unknown: 'unknown',
};

export const IdentityStatusesMap = [
  {
    id: IdentityStatuses.verified,
    color: 'success.main',
    textColor: 'primary.contrastText',
    isChangeable: true,
    isSelectable: true,
    isExplanation: true,
    isFilterable: true,
  },
  {
    id: IdentityStatuses.reviewNeeded,
    color: 'warning.main',
    textColor: 'common.black90',
    isChangeable: true,
    isSelectable: true,
    isExplanation: true,
    isFilterable: true,
  },
  {
    id: IdentityStatuses.rejected,
    color: 'error.main',
    textColor: 'primary.contrastText',
    isChangeable: true,
    isSelectable: true,
    isExplanation: true,
    isFilterable: true,
  },
  {
    id: IdentityStatuses.postponed,
    color: 'common.black75',
    textColor: 'primary.contrastText',
    isChangeable: true,
    isSelectable: false,
    isExplanation: true,
    isFilterable: true,
  },
  {
    id: IdentityStatuses.running,
    color: 'common.black50',
    textColor: 'common.black90',
    isChangeable: false,
    isSelectable: false,
    isExplanation: true,
    isFilterable: true,
  },
  {
    id: IdentityStatuses.pending,
    color: 'text.secondary',
    textColor: 'common.black90',
    style: 'threedots',
    isChangeable: false,
    isSelectable: false,
    isExplanation: false,
  },
  {
    id: IdentityStatuses.deleted,
    color: 'common.gray68',
    textColor: 'common.gray68',
    isChangeable: false,
    isSelectable: false,
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
  return !!founded && founded?.isChangeable;
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
