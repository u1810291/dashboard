export enum IpCheckSettingsTypes {
  IpValidation = 'ipValidation',
  VpnDetection = 'vpnDetection',
  AllowedRegions = 'allowedRegions',
}

export enum IpCheckCheckTypes {
  Basic = 'basic',
  GeoRestrictions = 'geoRestrictions',
  VpnDetection = 'vpnDetection',
}

export enum IpCheckErrorCodes {
  VpnDetected = 'ip.vpnDetected',
  Restricted = 'ip.restricted',
}

export interface AllowedRegions {
  country: string;
  regions: string[];
}

export enum IpCheckValidationTypes {
  None = 'none',
  Basic = 'basic',
  RestrictionInvisible = 'restriction:invisible',
  RestrictionVisible = 'restriction:visible',
  RestrictionBlock = 'restriction:block',
}

export const getAllAllowedRegions = (countries) => (
  countries.map((country) => ({
    country: country.id,
    regions: country.regions,
  }))
);
