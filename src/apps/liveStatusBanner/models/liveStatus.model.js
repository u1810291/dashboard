import { appPalette } from 'apps/theme/app.palette';

export const LiveStatusTypes = {
  Success: {
    id: 'All Systems Operational',
    color: appPalette.green,
    descriptionToken: 'LiveStatus.success',
  },
  Loading: {
    id: 'Loading',
    color: appPalette.yellow,
    descriptionToken: 'LiveStatus.loading',
  },
  PartialOutage: {
    id: 'Partial System Outage',
    color: appPalette.red,
    descriptionToken: 'LiveStatus.partialOutage',
  },
  MajorOutage: {
    id: 'Major Service Outage',
    color: appPalette.red,
    descriptionToken: 'LiveStatus.majorOutage',
  },
  PartiallyDegraded: {
    id: 'Partially Degraded Service',
    color: appPalette.red,
    descriptionToken: 'LiveStatus.partiallyDegraded',
  },
};

export const liveStatuses = [
  LiveStatusTypes.Success,
  LiveStatusTypes.Loading,
  LiveStatusTypes.PartialOutage,
  LiveStatusTypes.MajorOutage,
  LiveStatusTypes.PartiallyDegraded,
];

function unknownStatus(statusId) {
  return { id: statusId, color: appPalette.red };
}

export function findStatus(statusId) {
  return liveStatuses.find((status) => status.id === statusId) || unknownStatus(statusId);
}
