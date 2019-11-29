import { IdentityLivenessStatus, IdentityStatuses } from 'models/Identity.model';
import { colors } from './PDF.theme.common';

export const StatusColorMap = {
  [IdentityStatuses.verified]: colors.green,
  [IdentityStatuses.reviewNeeded]: colors.orange,
  [IdentityStatuses.rejected]: colors.red,
};

export function getStatusColor(status) {
  return StatusColorMap[status] || colors.black;
}

export const SelfieColorMap = {
  [IdentityLivenessStatus.Skipped]: colors.greyText,
  [IdentityLivenessStatus.InProgress]: colors.greyText,
  [IdentityLivenessStatus.Success]: colors.green,
  [IdentityLivenessStatus.Error]: colors.red,
};

export function getLivenessStatusColor(status) {
  return SelfieColorMap[status] || colors.black;
}
