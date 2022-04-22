import { AllowedRegions } from 'models/Country.model';
import { IVerificationMeritBlock, IVerificationWorkflow } from 'models/Verification.model';

export enum IpCheckSettingsTypes {
  IpValidation = 'ipValidation',
  VpnDetection = 'vpnDetection',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  AllowedRegions = 'allowedRegions',
}

export enum IpCheckCheckTypes {
  Basic = 'basic',
  GeoRestrictions = 'geoRestrictions',
  VpnDetection = 'vpnDetection',
}

export enum IpCheckErrorCodes { // TODO: @ggrigorev WF move to old if it's not used for IpCheckMeritOutput
  VpnDetected = 'ip.vpnDetected',
  Restricted = 'ip.restricted',
}

enum IpCheckGeoRestrictionTypes { // TODO: @ggrigorev WF in schema they are CapsLocked
  Invisible = 'invisible',
  Visible = 'visible',
}

interface IpCheckGeoRestrictionVerificationSettings {
  restriction: IpCheckGeoRestrictionTypes;
  allowedCountries: AllowedRegions[];
}

interface IpCheckVerificationSettings {
  vpnDetection: boolean;
  geoRestriction: IpCheckGeoRestrictionVerificationSettings;
}

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
  geoRestriction: boolean;
  isRunning: boolean;
}

export type IpCheckVerificationBlock = IVerificationMeritBlock<IpCheckVerificationSettings, IpCheckVerificationOutput>;

export type IpCheckId = 'ip';

export type IVerificationWithIpCheck = IVerificationWorkflow<IpCheckId, IpCheckVerificationBlock>;

export function getAllAllowedRegions(countries): AllowedRegions {
  return countries.map((country) => ({
    country: country.id,
    regions: country.regions,
  }));
}

export function getIpCheckUrl(data) {
  return `https://maps.googleapis.com/maps/api/staticmap?size=307x202&zoom=10&scale=2&format=png&maptype=roadmap&key=${process.env.REACT_APP_STATIC_GOOGLE_MAP_API_KEY}&markers=size:normal%7C${data.latitude},${data.longitude}`;
}
