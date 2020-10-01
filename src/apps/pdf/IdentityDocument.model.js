import { IdentityStatuses } from 'models/Identity.model';
import { StepStatus } from 'models/Step.model';
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
  [StepStatus.Incomplete]: colors.greyText,
  [StepStatus.Checking]: colors.greyText,
  [StepStatus.Success]: colors.green,
  [StepStatus.Failure]: colors.red,
};

export function getLivenessStatusColor(status) {
  return SelfieColorMap[status] || colors.black;
}
