import { StepStatus } from 'models/Step.model';

export const SENDER_NAME_LENGTH_LIMIT = 30;

export const PhoneValidationFields = [
  'countryCode',
  'phoneNumber',
  'isPhoneVerified',
];

export const PhoneOwnershipValidationMethods = {
  None: 'none',
  Sms: 'sms',
};

export function getPhoneValidationExtras(step) {
  if (!step) {
    return step;
  }
  let statusCode;
  if (step?.status < 200) {
    statusCode = StepStatus.Checking;
  } else if (step?.error) {
    statusCode = StepStatus.Failure;
  } else {
    statusCode = StepStatus.Success;
  }

  return {
    ...step,
    data: {
      ...step.data,
      countryCode: step?.data?.phoneNumber && `(${step?.data?.countryCode}) +${step?.data?.dialingCode}`,
      isPhoneVerified: step?.data?.phoneNumber && !step?.error,
    },
    statusCode,
  };
}
