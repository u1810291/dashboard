import { capitalize } from 'lodash';
import { isNil } from 'lib/isNil';

export enum RiskScoreLevelTypes {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export enum RiskScoreErrorTypes {
  Empty = 'empty',
  OutOfRange = 'outOfRange',
  Wrong = 'wrongSymbols',
}

export enum RiskScoreTypes {
  Minimum = 0,
  Low = 40,
  Medium = 60,
  High = 80,
  Maximum = 100,
  Custom = -1,
}

export interface RiskAnalysisDataModel {
  countryCode?: string;
  phoneNumber?: string;
  riskLevel?: RiskScoreLevelTypes;
  riskScore?: number;
  timezone?: string;
  city?: string;
  lineType?: string;
  carrier?: string;
  dialingCode?: string;
  maxPossibleRiskScore?: string;
}

export interface RiskAnalysisStep {
  data?: RiskAnalysisDataModel;
  error?: any;
}

export enum RiskAnalysisFieldTypes {
  CountryCode = 'countryCode',
  PhoneNumber = 'phoneNumber',
  RiskLevel = 'riskLevel',
  RiskScore = 'riskScore',
  Timezone = 'timezone',
  City = 'city',
  LineType = 'lineType',
  Carrier = 'carrier',
}

export function getRiskScoreThresholdError(score: number, type: RiskScoreTypes): RiskScoreErrorTypes {
  if (type !== RiskScoreTypes.Custom) {
    return null;
  }
  if (isNil(score) || Number.isNaN(score)) {
    return RiskScoreErrorTypes.Empty;
  }
  if (score < RiskScoreTypes.Minimum || score > RiskScoreTypes.Maximum) {
    return RiskScoreErrorTypes.OutOfRange;
  }
  return null;
}

export function getScoreTypeByValue(value: number): RiskScoreTypes {
  if (isNil(value)) {
    return RiskScoreTypes.Medium;
  }
  if ([RiskScoreTypes.Minimum, RiskScoreTypes.Maximum].includes(value)) {
    return RiskScoreTypes.Custom;
  }
  return Object.values(RiskScoreTypes).find((key) => key === value) as RiskScoreTypes || RiskScoreTypes.Custom;
}

export function getPhoneRiskValidationExtras(step: RiskAnalysisStep) {
  if (!step) {
    return null;
  }

  return {
    ...step,
    data: {
      ...step.data,
      countryCode: step?.data?.phoneNumber && `(${step?.data?.countryCode}) +${step?.data?.dialingCode}`,
      riskScore: step?.data?.riskScore && `${step?.data?.riskScore}/${step?.data?.maxPossibleRiskScore}`,
      riskLevel: step?.data?.riskLevel && capitalize(step?.data?.riskLevel),
    },
  };
}
