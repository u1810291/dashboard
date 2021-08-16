import { StepStatus } from 'models/Step.model';
import { AllowedRegions, CustomWatchlistErrorCodes } from 'apps/CustomWatchlist/models/CustomWatchlist.model';
import { VerificationPatternTypes } from './VerificationPatterns.model';

export interface IpValidation {
  allowedRegions: AllowedRegions[];
}

export interface CustomWatchlistStepData {
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

export interface CustomWatchlistStep {
  startCount: number;
  status: 0 | 100 | 200;
  id: VerificationPatternTypes.IpValidation;
  startedAt: string;
  error: any;
  data: CustomWatchlistStepData;
  completedAt: string;
}

export function getCustomWatchlistUrl(data) {
  return `https://maps.googleapis.com/maps/api/staticmap?size=307x202&zoom=10&scale=2&format=png&maptype=roadmap&key=${process.env.REACT_APP_STATIC_GOOGLE_MAP_API_KEY}&markers=size:normal%7C${data.latitude},${data.longitude}`;
}

export function getCustomWatchlistStatus(CustomWatchlist: CustomWatchlistStep): StepStatus {
  if (CustomWatchlist?.status < 200) {
    return StepStatus.Checking;
  }
  if (CustomWatchlist?.data?.safe) {
    return StepStatus.Success;
  }
  return StepStatus.Failure;
}

export function getCustomWatchlistStep(steps = []): CustomWatchlistStep {
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
      mapUrl: getCustomWatchlistUrl(step.data),
    },
  };
}

export function getCustomWatchlistStatusByError(step: CustomWatchlistStep, errorCode: CustomWatchlistErrorCodes) {
  if (step?.status < 200) {
    return StepStatus.Checking;
  }
  return step?.error?.code === errorCode ? StepStatus.Failure : StepStatus.Success;
}

export enum CustomWatchlistActions {
  AutoReject = 'auto-reject',
  Manual = 'manual',
  NotifyWebhook = 'notify-webhook',
}
