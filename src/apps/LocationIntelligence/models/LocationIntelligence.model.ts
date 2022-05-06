import { AllowedRegions } from 'models/Country.model';
import { IVerificationMeritBlock, IVerificationWorkflow } from 'models/Verification.model';
import { MeritId } from 'models/Product.model';

export enum LocationIntelligenceSettingsTypes {
  IpValidation = 'ipValidation',
  VpnDetection = 'vpnDetection',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  AllowedRegions = 'allowedRegions',
  HighAccuracy = 'highAccuracy',
}

export enum LocationIntelligenceValidationTypes {
  None = 'none',
  Basic = 'basic',
  RestrictionInvisible = 'restriction:invisible',
  RestrictionVisible = 'restriction:visible',
  RestrictionBlock = 'restriction:block',
}

export enum LocationIntelligenceCheckTypes {
  Basic = 'basic',
  GeoRestrictions = 'geoRestrictions',
  VpnDetection = 'vpnDetection',
  HighAccuracy = 'highAccuracyDetection'
}

export enum LocationIntelligenceErrorCodes { // TODO: @ggrigorev WF move to old if it's not used for IpCheckMeritOutput
  VpnDetected = 'ip.vpnDetected',
  Restricted = 'ip.restricted',
}

enum LocationIntelligenceGeoRestrictionTypes { // TODO: @ggrigorev WF in schema they are CapsLocked
  Invisible = 'invisible',
  Visible = 'visible',
}

interface ILocationIntelligenceGeoRestrictionVerificationSettings {
  restriction: LocationIntelligenceGeoRestrictionTypes;
  allowedCountries: AllowedRegions[];
}

interface ILocationIntelligenceVerificationSettings {
  vpnDetection: boolean;
  geoRestriction: ILocationIntelligenceGeoRestrictionVerificationSettings;
}

export const IpCheckMeritId: MeritId = 'ip-check';

export interface IpCheckVerificationOutput {
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
  safe: boolean;
  // TODO: @ggrigorev WF following is a draft. Maybe replace safe and isRunning with status field
  vpnDetection: boolean;
  geoRestriction: ILocationIntelligenceGeoRestrictionVerificationSettings;
}

export interface GeoRestrictions {
  allowedCountries: AllowedRegions;
  restriction: string;
}

export interface IpCheckMeritSettings {
  vpnDetection: boolean;
  geoRestriction: GeoRestrictions;
  relation: any;
}

export type IpCheckVerificationBlock = IVerificationMeritBlock<ILocationIntelligenceVerificationSettings, IpCheckVerificationOutput>;

export enum LocationIntelligencePlatformTypes {
  Android = 'android',
  IOs = 'iOS',
  WebMobile = 'web_mobile',
  WebDesktop = 'web_desktop',
}

export enum LocationIntelligenceIconTypes {
  Mobile = 'locIntMobile',
  Desktop = 'locIntDesktop',
  LatLong = 'locIntLatLong',
  HighAccuracy = 'locIntHighAccuracy',
  VpnDetect = 'locIntVpnDetect',
  GeoRestriction = 'locIntGeoRestriction'
}

export enum SystemSubtype {
  iOS = 'ios',
  Android = 'android',
}

export interface LocationIntelligenceVerificationOutput {
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  highAccuracy: boolean;
  platform: string;
  address: string;
  vpnDetectionEnabled: boolean;
  ipRestrictionEnabled: boolean;
  zip: string;
  safe: boolean;
  // TODO: @ggrigorev WF following is a draft. Maybe replace safe and isRunning with status field
  vpnDetection: boolean;
  geoRestriction: boolean;
  isRunning: boolean;
}

export type LocationIntelligenceVerificationBlock = IVerificationMeritBlock<ILocationIntelligenceVerificationSettings, LocationIntelligenceVerificationOutput>;

export type IpCheckId = 'ip';

export type IVerificationWithLocationIntelligence = IVerificationWorkflow<IpCheckId, LocationIntelligenceVerificationBlock>;

export function getAllAllowedRegions(countries): AllowedRegions {
  return countries.map((country) => ({
    country: country.id,
    regions: country.regions,
  }));
}

export function getLocationIntelligenceUrl(data) {
  return `https://maps.googleapis.com/maps/api/staticmap?size=404x202&zoom=10&scale=2&format=png&maptype=roadmap&key=${process.env.REACT_APP_STATIC_GOOGLE_MAP_API_KEY}&markers=size:normal%7C${data.latitude},${data.longitude}`;
}
