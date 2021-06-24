import { EmailValidationExtrasType } from 'apps/EmailValidation/models/EmailValidation.model';
import { getStepStatus } from 'models/Step.model';
import { BaseEmailStep } from 'models/EmailBase.interface';

interface EmailRiskData {
  emailAddress: string;
  riskScore: number;
  riskThreshold: number,
}

export interface EmailRiskStep extends BaseEmailStep<EmailRiskData> {
  checkStatus: string;
}

export const EmailRiskFields = [
  { fieldName: 'emailAddress' },
  { fieldName: 'riskScore', inline: true },
  { fieldName: 'riskThreshold', inline: true },
];

export function getEmailRiskExtra(emailRiskStep: EmailRiskStep): EmailRiskStep {
  if (!emailRiskStep) {
    return null;
  }

  return {
    ...emailRiskStep,
    checkStatus: getStepStatus(emailRiskStep),
  };
}
