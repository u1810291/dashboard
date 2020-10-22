import { get } from 'lodash';

export function getDevicePlatform(identity) {
  return get(identity, '_embedded.verification.deviceFingerprint.app.platform', null);
}

export function getDeviceOSName(identity) {
  return get(identity, '_embedded.verification.deviceFingerprint.os.name', null);
}

export function getDeviceOSVersion(identity) {
  return get(identity, '_embedded.verification.deviceFingerprint.os.version', null);
}

export function getDeviceBrowserName(identity) {
  return get(identity, '_embedded.verification.deviceFingerprint.browser.name', null);
}

export function getDeviceBrowserMajor(identity) {
  return get(identity, '_embedded.verification.deviceFingerprint.browser.major', null);
}

export function getDeviceModel(identity) {
  return get(identity, '_embedded.verification.deviceFingerprint.device.model', null);
}

export function getDeviceTypeValue(identity) {
  return get(identity, '_embedded.verification.deviceFingerprint.device.type', null);
}

export const OSTypes = {
  Android: 'Android',
  Windows: 'Windows',
  Unknown: 'Unknown',
  MacOS: 'MacOS',
  IOS: 'iOS',
  Linux: 'Linux',
  Ubuntu: 'Ubuntu',
  IPadOs: 'iPad',
  FreeBSD: 'BSD',
};

export const PlatformTypes = {
  IOS: 'iOS',
  Android: 'android',
  WebDesktop: 'web_desktop',
  WebMobile: 'web_mobile',
  Api: 'api',
};

export const DeviceTypes = {
  Desktop: 'desktop',
  Tablet: 'tablet',
  Mobile: 'mobile',
};

export const BrowserTypes = {
  Chrome: 'Chrome',
  Unknown: 'Unknown',
  Safari: 'Safari',
  Opera: 'Opera',
  Firefox: 'Firefox',
  Pylib: 'Pylib',
  ThirdApp: '3rdapp',
  Samsung: 'Samsung',
  OKhttp: 'OKhttp',
  Java: 'Java',
  Other: 'Other',
};

export function getDevicePlatformType(identity) {
  const str = getDevicePlatform(identity);
  const value = Object.values(PlatformTypes).find((type) => new RegExp(type, 'i').test(str));
  return value || PlatformTypes.Api;
}

export function getDeviceOSType(identity) {
  const str = getDeviceOSName(identity);
  const value = Object.values(OSTypes).find((type) => new RegExp(type, 'i').test(str));
  return value || OSTypes.Unknown;
}

export function getDeviceOSLabel(identity) {
  const name = getDeviceOSName(identity);
  const version = getDeviceOSVersion(identity) || '';
  return name ? `${name} ${version}` : OSTypes.Unknown;
}

export function getDeviceBrowserType(identity) {
  const str = getDeviceBrowserName(identity);
  if (!str) return BrowserTypes.Unknown;
  const value = Object.values(BrowserTypes).find((type) => new RegExp(type, 'i').test(str));
  return value || BrowserTypes.Other;
}

export function getDeviceBrowserLabel(identity) {
  const name = getDeviceBrowserName(identity);
  const version = getDeviceBrowserMajor(identity) || '';
  return name ? `${name} ${version}` : BrowserTypes.Unknown;
}

export function getDeviceType(identity) {
  const platformType = getDevicePlatformType(identity);
  const os = getDeviceOSType(identity);

  switch (platformType) {
    case PlatformTypes.WebDesktop:
      return DeviceTypes.Desktop;
    case PlatformTypes.WebMobile:
      return getDeviceTypeValue(identity);
    case PlatformTypes.Android:
      return DeviceTypes.Mobile;
    case PlatformTypes.IOS:
      if (os === OSTypes.IPadOs) {
        return DeviceTypes.Tablet;
      }
      return DeviceTypes.Mobile;
    default:
      return null;
  }
}
