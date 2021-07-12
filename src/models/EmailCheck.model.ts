import { StepStatusType } from './Step.model';
import { VerificationPatternTypes } from './VerificationPatterns.model';

export interface EmailCheckStepData {
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
  safe: boolean;
  mapUrl: string;
}

export interface EmailCheckStep {
  startCount: number;
  status: StepStatusType;
  id: VerificationPatternTypes.IpValidation;
  startedAt: string;
  error: any;
  data: EmailCheckStepData;
  completedAt: string;
}
