import { isNil } from 'lib/isNil';
import { ProductSettings } from 'models/Product.model';

export enum EmailCheckCheckTypes {
  EmailCheck = 'emailCheck',
  RiskCheck = 'riskCheck',
}

export enum EmailRiskThresholdModes {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Custom = 'custom',
}

export enum EmailCheckSettingTypes {
  CompanyName = 'companyName',
  EmailRiskThreshold = 'emailRiskThreshold',
  EmailOwnershipValidation = 'emailOwnershipValidation',
  EmailRiskValidation = 'emailRiskValidation',
}

export type EmailCheckProductSettings = ProductSettings<EmailCheckSettingTypes>;

export enum EmailCheckStepModes {
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

export enum EmailCheckErrorTypes {
  Empty = 'empty',
  OutOfRange = 'outOfRange',
}

export const getDefaultRiskThresholdMode = (score: string | number): EmailRiskThresholdModes => {
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
    return EmailCheckErrorTypes.OutOfRange;
  }
  if (Number.isNaN(score)) {
    return EmailCheckErrorTypes.Empty;
  }
  return null;
};
