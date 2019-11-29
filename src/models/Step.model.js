export const StepStatus = {
  Success: 'success',
  Failure: 'failure',
  Checking: 'checking',
};

export function getStepStatus(status, error) {
  if (status === 200) {
    return error
      ? StepStatus.Failure
      : StepStatus.Success;
  }
  return StepStatus.Checking;
}
