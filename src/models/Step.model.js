export const StepStatus = {
  Success: 'success',
  Failure: 'failure',
  Checking: 'checking',
};

export const LEGACY_ERROR = 'LegacyError';
export const STEP_ERROR = 'StepError';
export const SYSTEM_ERROR = 'SystemError';

export function getStepStatus(status, error) {
  if (status === 200) {
    return error
      ? StepStatus.Failure
      : StepStatus.Success;
  }
  return StepStatus.Checking;
}
