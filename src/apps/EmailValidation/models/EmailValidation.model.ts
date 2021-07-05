import { getStepStatus } from 'models/Step.model';
import { isNil } from 'lib/isNil';

export interface EmailValidationType {
  status: number;
  id: string;
  error: {
    type: string;
    code: string;
    message: string;
  } | null;
  data: {
    emailAddress: string;
  } | null;
}
export interface EmailValidationExtrasType extends EmailValidationType {
  checkStatus: string;
}

export const emailValidationCheck = {
  id: 'emailCheck',
  title: 'Product.checks.emailCheck.title',
  text: 'Product.checks.emailCheck.text',
  badgeText: 'Product.checks.emailCheck.badgeText',
};

export function getEmailVerificationExtra(emailStep: EmailValidationType): EmailValidationExtrasType {
  if (!emailStep) {
    return null;
  }

  return {
    ...emailStep,
    checkStatus: getStepStatus(emailStep),
  };
}
export enum EmailRiskThresholdModes {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Custom = 'Custom',
}

export enum EmailValidationStepModes {
  None = 'none',
  Optional = 'optional',
  Forced = 'forced',
}

export enum EmailRiskPredefinedThreshold {
  Min = 0,
  Low = 40,
  Default = 80,
  High = 90,
  Max = 100
}

export const SENDER_NAME_LENGTH_LIMIT = 30;

export const ScoreMapping = {
  [EmailRiskThresholdModes.Low]: EmailRiskPredefinedThreshold.Low,
  [EmailRiskThresholdModes.Medium]: EmailRiskPredefinedThreshold.Default,
  [EmailRiskThresholdModes.High]: EmailRiskPredefinedThreshold.High,
};

export const RiskScoreFallback = {
  [EmailRiskPredefinedThreshold.Low]: EmailRiskThresholdModes.Low,
  [EmailRiskPredefinedThreshold.Default]: EmailRiskThresholdModes.Medium,
  [EmailRiskPredefinedThreshold.High]: EmailRiskThresholdModes.High,
};

export enum EmailValidationErrorTypes {
  Empty = 'empty',
  OutOfRange = 'outOfRange',
}

export const getDefaultRiskThresholdMode = (score: number): string => {
  if (isNil(score)) {
    return EmailRiskThresholdModes.Medium;
  }
  if (!RiskScoreFallback[score]) {
    return EmailRiskThresholdModes.Custom;
  }
  return RiskScoreFallback[score];
};

export const validateRiskThreshold = (score: number): string | null => {
  if (score < EmailRiskPredefinedThreshold.Min || score > EmailRiskPredefinedThreshold.Max) {
    return EmailValidationErrorTypes.OutOfRange;
  }
  if (Number.isNaN(score)) {
    return EmailValidationErrorTypes.Empty;
  }
  return null;
};
