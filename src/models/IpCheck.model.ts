import { StepStatus } from 'models/Step.model';
import { VerificationPatternTypes } from './VerificationPatterns.model';

export interface IpCheckStepData {
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

export interface IpCheckStep {
  startCount: number;
  status: 0 | 100 | 200;
  id: VerificationPatternTypes.IpValidation;
  startedAt: string;
  error: any;
  data: IpCheckStepData;
  completedAt: string;
}

export function getIpCheckUrl(data) {
  return `https://maps.googleapis.com/maps/api/staticmap?size=307x202&zoom=10&scale=2&format=png&maptype=roadmap&key=${process.env.REACT_APP_STATIC_GOOGLE_MAP_API_KEY}&markers=size:normal%7C${data.latitude},${data.longitude}`;
}

export function getIpCheckStatus(ipCheck) {
  if (ipCheck?.status < 200) {
    return StepStatus.Checking;
  }
  if (ipCheck?.data?.safe) {
    return StepStatus.Success;
  }
  return StepStatus.Failure;
}

export function getIpCheckStep(steps = []): IpCheckStep {
  const step = steps.find((item) => item.id === VerificationPatternTypes.IpValidation);

  if (!step) {
    return null;
  }

  if (!(!step.error && step.data)) {
    return step;
  }

  return {
    ...step,
    data: {
      ...step.data,
      mapUrl: getIpCheckUrl(step.data),
    },
  };
}
