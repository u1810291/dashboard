import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { IStep, StepStatus } from 'models/Step.model';
import { AllowedRegions, Country } from 'models/Country.model';
import { LocationIntelligenceVerificationOutput } from '../../LocationIntelligence';

export enum LocationIntelligenceSettingsTypes {
  IpValidation = 'ipValidation',
  VpnDetection = 'vpnDetection',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  AllowedRegions = 'allowedRegions',
  HighAccuracy = 'highAccuracy',
}

export enum LocationIntelligenceCheckTypes {
  Basic = 'basic',
  GeoRestrictions = 'geoRestrictions',
  VpnDetection = 'vpnDetection',
  HighAccuracy = 'highAccuracyDetection'
}

export enum LocationIntelligenceErrorCodes {
  VpnDetected = 'ip.vpnDetected',
  Restricted = 'ip.restricted',
}

export enum LocationIntelligenceValidationTypes {
  None = 'none',
  Basic = 'basic',
  RestrictionInvisible = 'restriction:invisible',
  RestrictionVisible = 'restriction:visible',
  RestrictionBlock = 'restriction:block',
}

export interface LocationValidation {
  allowedRegions: AllowedRegions[];
}

export interface LocationIntelligenceStep extends IStep{
  startCount: number;
  status: 0 | 100 | 200;
  id: VerificationPatternTypes.IpValidation;
  startedAt: string;
  error: any;
  data: LocationIntelligenceVerificationOutput;
  completedAt: string;
  isRunning: boolean;
}

export function getLocationIntelligenceStatus(locationStep: LocationIntelligenceStep): StepStatus {
  if (locationStep?.status < 200) {
    return StepStatus.Checking;
  }
  if (locationStep?.data?.safe) {
    return StepStatus.Success;
  }
  return StepStatus.Failure;
}

export function getLocationIntelligenceUrl(data) {
  if (data === undefined) {
    return null;
  }
  return `https://maps.googleapis.com/maps/api/staticmap?size=404x202&zoom=10&scale=2&format=png&maptype=roadmap&key=${process.env.REACT_APP_STATIC_GOOGLE_MAP_API_KEY}&markers=size:normal%7C${data.latitude},${data.longitude}`;
}

export function getLocationIntelligenceStep(steps: IStep[] = []): LocationIntelligenceStep {
  const ipStep = steps.find((item) => item.id === VerificationPatternTypes.IpValidation);
  const locationStep = steps.find((item) => item.id === VerificationPatternTypes.Geolocation);
  if (!ipStep) {
    return null;
  }

  // if (!(!ipStep.error && ipStep.data)) {
  //   return ipStep as LocationIntelligenceStep;
  // }

  return {
    ...ipStep,
    isRunning: ipStep.status < 200,
    data: {
      ...ipStep.data,
      ...locationStep?.data,
      highAccuracy: !!locationStep,
      mapUrl: getLocationIntelligenceUrl(ipStep?.data || locationStep?.data),
    },
  } as LocationIntelligenceStep;
}

export function getLocationIntelligenceStatusByError(step: LocationIntelligenceStep, errorCode: LocationIntelligenceErrorCodes) {
  if (step?.status < 200) {
    return StepStatus.Checking;
  }
  return step?.error?.code === errorCode ? StepStatus.Failure : StepStatus.Success;
}

export const getAllAllowedRegions = (countries: Country[]): AllowedRegions[] => (
  countries.map((country) => ({
    country: country.id,
    regions: country.regions,
  }))
);
