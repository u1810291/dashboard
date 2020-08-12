import { BiometricLivenessStatus } from 'models/Biometric.model';
import { IdentityStatuses } from 'models/Identity.model';
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
  [BiometricLivenessStatus.Skipped]: colors.greyText,
  [BiometricLivenessStatus.InProgress]: colors.greyText,
  [BiometricLivenessStatus.Success]: colors.green,
  [BiometricLivenessStatus.Error]: colors.red,
};

export function getLivenessStatusColor(status) {
  return SelfieColorMap[status] || colors.black;
}
