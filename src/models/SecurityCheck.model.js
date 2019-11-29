import { getStepStatus } from 'models/Step.model';

export function getSecurityChecksExtra(steps = []) {
  return steps.map(({ id, status, error }) => ({
    id,
    error,
    titleLabel: `SecurityCheckStep.${id}.title`,
    statusLabel: `SecurityCheckStep.${id}.${getStepStatus(status, error)}`,
  }));
}
