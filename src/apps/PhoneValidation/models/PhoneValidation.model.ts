export const SENDER_NAME_LENGTH_LIMIT = 30;

export enum PhoneValidationTypes {
  CountryCode = 'countryCode',
  PhoneNumber = 'phoneNumber',
  IsPhoneVerified = 'isPhoneVerified',
}

export interface PhoneValidationDataModel {
  countryCode?: string,
  phoneNumber?: string,
  isPhoneVerified?: boolean,
  dialingCode?: string,
}

export interface PhoneValidationStep {
  data?: PhoneValidationDataModel,
  error?: any,
}

export enum PhoneOwnershipValidationMethodTypes {
  None = 'none',
  Sms = 'sms',
  SmsOptional = 'sms+optional',
}

export function getPhoneValidationExtras(step: PhoneValidationStep) {
  if (!step) {
    return step;
  }
  return {
    ...step,
    data: {
      ...step.data,
      countryCode: step?.data?.phoneNumber && `(${step?.data?.countryCode}) +${step?.data?.dialingCode}`,
      isPhoneVerified: step?.data?.phoneNumber && !step?.error,
    },
  };
}
