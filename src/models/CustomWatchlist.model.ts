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

export enum CustomWatchlistActions {
  AutoReject = 'auto-reject',
  Manual = 'manual',
  NotifyWebhook = 'notify-webhook',
}

export interface Watchlist {
  id: number;
  name: string;
  // eslint-disable-next-line camelcase
  merchant_id: string;
  'createdAt': string;
  'updatedAt': string;
}
