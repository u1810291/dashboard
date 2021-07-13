import { capitalize } from 'lodash';
import { getStepStatus, IStep } from 'models/Step.model';
import { VerificationPatternTypes } from './VerificationPatterns.model';

export enum PhoneValidationTypes {
  CountryCode = 'countryCode',
  PhoneNumber = 'phoneNumber',
  IsPhoneVerified = 'isPhoneVerified',
}

export interface PhoneValidationStepData {
  countryCode?: string;
  phoneNumber?: string;
  isPhoneVerified?: boolean;
  dialingCode?: string;
}

export type PhoneValidationStep = IStep<PhoneValidationStepData>;

export enum RiskScoreLevelTypes {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export interface PhoneRiskStepData {
  countryCode?: string;
  phoneNumber?: string;
  riskLevel?: string;
  riskScore?: number | string;
  timezone?: string;
  city?: string;
  lineType?: string;
  carrier?: string;
  dialingCode?: string;
  maxPossibleRiskScore?: string;
}

export type PhoneRiskStep = IStep<PhoneRiskStepData>;

export enum PhoneRiskFieldTypes {
  CountryCode = 'countryCode',
  PhoneNumber = 'phoneNumber',
  RiskLevel = 'riskLevel',
  RiskScore = 'riskScore',
  Timezone = 'timezone',
  City = 'city',
  LineType = 'lineType',
  Carrier = 'carrier',
}

export function getPhoneValidationExtras(step: PhoneValidationStep) {
  if (!step) {
    return step;
  }

  return {
    ...step,
    checkStatus: getStepStatus(step),
    data: {
      ...step.data,
      countryCode: step?.data?.phoneNumber && `(${step?.data?.countryCode}) +${step?.data?.dialingCode}`,
      isPhoneVerified: step?.data?.phoneNumber && !step?.error,
    },
  };
}

export function getPhoneValidationStep(steps: IStep[]): PhoneValidationStep {
  const step = (steps || []).find((item) => item.id === VerificationPatternTypes.PhoneOwnershipValidation);
  if (!step) {
    return null;
  }
  return getPhoneValidationExtras(step);
}

export function getPhoneRiskValidationExtras(step: PhoneRiskStep) {
  if (!step) {
    return null;
  }
  return {
    ...step,
    checkStatus: getStepStatus(step),
    data: {
      ...step.data,
      countryCode: step?.data?.phoneNumber && `(${step?.data?.countryCode}) +${step?.data?.dialingCode}`,
      riskScore: step?.data?.riskScore && `${step?.data?.riskScore}/${step?.data?.maxPossibleRiskScore}`,
      riskLevel: step?.data?.riskLevel && capitalize(step?.data?.riskLevel),
    },
  };
}

export function getPhoneRiskStep(steps: IStep[]): PhoneRiskStep {
  const step = (steps || []).find((item) => item.id === VerificationPatternTypes.PhoneRiskValidation);
  if (!step) {
    return null;
  }
  return getPhoneRiskValidationExtras(step);
}
