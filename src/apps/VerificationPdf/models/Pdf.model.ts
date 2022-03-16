import { appPalette } from 'apps/theme';
import { IdentityStatuses } from 'models/Status.model';

export const StatusesColorMap = [
  {
    id: IdentityStatuses.verified,
    color: appPalette.green,
    textColor: appPalette.white,
  },
  {
    id: IdentityStatuses.reviewNeeded,
    color: appPalette.yellow,
    textColor: appPalette.black90,
  },
  {
    id: IdentityStatuses.rejected,
    color: appPalette.red,
    textColor: appPalette.white,
  },
  {
    id: IdentityStatuses.running,
    color: appPalette.black50,
    textColor: appPalette.black90,
  },
  {
    id: IdentityStatuses.pending,
    color: appPalette.black50,
    textColor: appPalette.black90,
    style: 'threedots',
  },
  {
    id: IdentityStatuses.deleted,
    color: '',
    textColor: '',
  },
];
