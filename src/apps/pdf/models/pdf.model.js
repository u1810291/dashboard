import { IdentityStatuses } from 'models/Status.model';
import { colors } from '../PDF.theme.common';

export const IdentityStatusesColorMap = [
  {
    id: IdentityStatuses.verified,
    color: colors.green,
    textColor: colors.white,
  },
  {
    id: IdentityStatuses.reviewNeeded,
    color: colors.yellow,
    textColor: colors.black90,
  },
  {
    id: IdentityStatuses.rejected,
    color: colors.red,
    textColor: colors.white,
  },
  {
    id: IdentityStatuses.running,
    color: colors.black50,
    textColor: colors.black90,
  },
  {
    id: IdentityStatuses.pending,
    color: colors.black50,
    textColor: colors.black90,
    style: 'threedots',
  },
  {
    id: IdentityStatuses.deleted,
    color: '',
    textColor: '',
  },
];

export const DOWNLOAD_PDF_TYPE = 'downloadPdf';
