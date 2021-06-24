import { BaseEmailStep, EmailValidationData } from 'models/EmailBase.interface';
import { getStepStatus } from './Step.model';

export interface EmailValidationDataExtra extends EmailValidationData {
  isSourceVerified?: boolean;
}

interface EmailValidation extends BaseEmailStep {}

export interface EmailValidationExtra extends BaseEmailStep<EmailValidationDataExtra> {
  checkStatus?: string;
}

export const EmailValidationFields = [
  { fieldName: 'emailAddress' },
  { fieldName: 'isSourceVerified', inline: true },
];

export function getEmailVerificationExtra(step: EmailValidation): EmailValidationExtra {
  if (!step) {
    return null;
  }

  return {
    ...step,
    data: {
      ...step.data,
      isSourceVerified: step?.data?.emailAddress && !step?.error,
    },
    checkStatus: getStepStatus(step),
  };
}
