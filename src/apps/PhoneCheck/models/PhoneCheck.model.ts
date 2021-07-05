import { isNil } from 'lib/isNil';

export const COMPANY_NAME_LENGTH_LIMIT = 30;

export enum PhoneCheckCheckTypes {
  PhoneValidation = 'phoneValidation',
  RiskAnalysis = 'riskAnalysis',
}

export enum PhoneCheckSettingTypes {
  PhoneOwnershipValidation = 'phoneOwnershipValidation',
  CompanyName = 'companyName',
  PhoneRiskValidation = 'phoneRiskValidation',
  PhoneRiskThreshold = 'phoneRiskThreshold',
}

export enum PhoneOwnershipValidationTypes {
  None = 'none',
  Sms = 'sms',
  SmsOptional = 'sms+optional',
}

export enum PhoneRiskThresholdModes {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Custom = 'Custom',
}

export enum PhoneRiskPredefinedThreshold {
  Min = 0,
  Low = 40,
  Default = 60,
  High = 80,
  Max = 100
}

export const ScoreMapping = {
  [PhoneRiskThresholdModes.Low]: PhoneRiskPredefinedThreshold.Low,
  [PhoneRiskThresholdModes.Medium]: PhoneRiskPredefinedThreshold.Default,
  [PhoneRiskThresholdModes.High]: PhoneRiskPredefinedThreshold.High,
};

export const RiskScoreFallback = {
  [PhoneRiskPredefinedThreshold.Low]: PhoneRiskThresholdModes.Low,
  [PhoneRiskPredefinedThreshold.Default]: PhoneRiskThresholdModes.Medium,
  [PhoneRiskPredefinedThreshold.High]: PhoneRiskThresholdModes.High,
};

export enum PhoneCheckErrorTypes {
  Empty = 'empty',
  OutOfRange = 'outOfRange',
}

export const validateRiskThreshold = (score: number): string | null => {
  if (score < PhoneRiskPredefinedThreshold.Min || score > PhoneRiskPredefinedThreshold.Max) {
    return PhoneCheckErrorTypes.OutOfRange;
  }
  if (Number.isNaN(score)) {
    return PhoneCheckErrorTypes.Empty;
  }
  return null;
};

export const getDefaultRiskThresholdMode = (score: string | number): PhoneRiskThresholdModes => {
  if (isNil(score)) {
    return PhoneRiskThresholdModes.Medium;
  }
  if (!RiskScoreFallback[score]) {
    return PhoneRiskThresholdModes.Custom;
  }
  return RiskScoreFallback[score];
};
