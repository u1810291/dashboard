import { getStepStatus, IStep } from 'models/Step.model';
import { VerificationPatternTypes } from './VerificationPatterns.model';

export interface EmailValidationStepData {
  emailAddress: string;
}

export type EmailValidationStep = IStep<EmailValidationStepData>;

export const EmailValidationFields = [
  { fieldName: 'emailAddress' },
  { fieldName: 'isSourceVerified', inline: true },
];

export function getEmailValidationExtra(step: IStep): EmailValidationStep {
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

export function getEmailValidationStep(steps: IStep[]): EmailValidationStep {
  const step = steps.find((item) => item.id === VerificationPatternTypes.EmailOwnershipValidation);
  if (!step) {
    return null;
  }
  return getEmailValidationExtra(step);
}

interface EmailRiskStepData {
  emailAddress: string;
  riskScore: number;
  riskThreshold: number;
}

export type EmailRiskStep = IStep<EmailRiskStepData>;

export const EmailRiskFields = [
  { fieldName: 'emailAddress' },
  { fieldName: 'riskScore', inline: true },
  { fieldName: 'riskThreshold', inline: true },
];

export function getEmailRiskExtra(emailRiskStep: IStep): EmailRiskStep {
  if (!emailRiskStep) {
    return null;
  }

  return {
    ...emailRiskStep,
    checkStatus: getStepStatus(emailRiskStep),
  };
}

export function getEmailRiskStep(steps: IStep[]): EmailRiskStep {
  const step = (steps || []).find((item) => item.id === VerificationPatternTypes.EmailRiskValidation);
  if (!step) {
    return null;
  }
  return getEmailRiskExtra(step);
}
