import { ReactComponent as DesktopGrayIcon } from 'apps/identity/icons/desktop-gray.svg';
import { get } from 'lodash';
import { FiSmartphone, FiTablet } from 'react-icons/fi';
import { ReactComponent as AndroidIcon } from '../apps/identity/icons/android.svg';
import { ReactComponent as AppleIcon } from '../apps/identity/icons/apple.svg';
import { ReactComponent as BlueBoxIcon } from '../apps/identity/icons/blue-box.svg';
import { ReactComponent as ChromeIcon } from '../apps/identity/icons/chrome.svg';
import { ReactComponent as DesktopIcon } from '../apps/identity/icons/desktop.svg';
import { ReactComponent as EdgeIcon } from '../apps/identity/icons/edge.svg';
import { ReactComponent as FirefoxIcon } from '../apps/identity/icons/firefox.svg';
import { ReactComponent as FreeBSDIcon } from '../apps/identity/icons/freeBSD.svg';
import { ReactComponent as GreenBoxIcon } from '../apps/identity/icons/green-box.svg';
import { ReactComponent as LinuxIcon } from '../apps/identity/icons/linux.svg';
import { ReactComponent as OperaIcon } from '../apps/identity/icons/opera.svg';
import { ReactComponent as SafariIcon } from '../apps/identity/icons/safari.svg';
import { ReactComponent as SamsungIcon } from '../apps/identity/icons/samsung.svg';
import { ReactComponent as UbuntuIcon } from '../apps/identity/icons/ubuntu.svg';
import { ReactComponent as WindowsIcon } from '../apps/identity/icons/windows.svg';
import { ReactComponent as YandexIcon } from '../apps/identity/icons/yandex.svg';

export function getDevicePlatform(deviceFingerprint) {
  return get(deviceFingerprint, 'app.platform', null);
}

export function getDeviceOSName(deviceFingerprint) {
  return get(deviceFingerprint, 'os.name', null);
}

export function getDeviceOSVersion(deviceFingerprint) {
  return get(deviceFingerprint, 'os.version', null);
}

export function getDeviceBrowserName(deviceFingerprint) {
  return get(deviceFingerprint, 'browser.name', null);
}

export function getDeviceBrowserMajor(deviceFingerprint) {
  return get(deviceFingerprint, 'browser.major', null);
}

export function getDeviceModel(deviceFingerprint) {
  return get(deviceFingerprint, 'device.model', null);
}

export function getDeviceTypeValue(deviceFingerprint) {
  return get(deviceFingerprint, 'device.type', null);
}

export const DevicesTableTypes = {
  devices: 'devices',
  browsers: 'browsers',
};

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
  Edge: 'Edge',
  Yandex: 'Yandex',
};

export const DeviceIcons = {
  [DeviceTypes.Mobile]: FiSmartphone,
  [DeviceTypes.Tablet]: FiTablet,
  [DeviceTypes.Desktop]: DesktopIcon,
};

export const OSIcons = {
  [OSTypes.Android]: AndroidIcon,
  [OSTypes.Windows]: WindowsIcon,
  [OSTypes.Unknown]: BlueBoxIcon,
  [OSTypes.MacOS]: AppleIcon,
  [OSTypes.IOS]: AppleIcon,
  [OSTypes.Linux]: LinuxIcon,
  [OSTypes.Ubuntu]: UbuntuIcon,
  [OSTypes.IPadOs]: AppleIcon,
  [OSTypes.FreeBSD]: FreeBSDIcon,
};

export const BrowserIcons = {
  [BrowserTypes.Chrome]: ChromeIcon,
  [BrowserTypes.Unknown]: BlueBoxIcon,
  [BrowserTypes.Safari]: SafariIcon,
  [BrowserTypes.Opera]: OperaIcon,
  [BrowserTypes.Firefox]: FirefoxIcon,
  [BrowserTypes.Pylib]: GreenBoxIcon,
  [BrowserTypes.ThirdApp]: GreenBoxIcon,
  [BrowserTypes.Samsung]: SamsungIcon,
  [BrowserTypes.OKhttp]: GreenBoxIcon,
  [BrowserTypes.Java]: GreenBoxIcon,
  [BrowserTypes.Other]: BlueBoxIcon,
  [BrowserTypes.Edge]: EdgeIcon,
  [BrowserTypes.Yandex]: YandexIcon,
};

export function getDeviceTypeByString(str) {
  return Object.values(DeviceTypes).find((type) => new RegExp(type, 'i').test(str));
}

export function getDevicePlatformType(deviceFingerprint) {
  const str = getDevicePlatform(deviceFingerprint);
  const value = Object.values(PlatformTypes).find((type) => new RegExp(type, 'i').test(str));
  return value || PlatformTypes.Api;
}

export function getDeviceOSType(deviceFingerprint) {
  const str = getDeviceOSName(deviceFingerprint);
  const value = Object.values(OSTypes).find((type) => new RegExp(type, 'i').test(str));
  return value || OSTypes.Unknown;
}

export function getDeviceOSLabel(deviceFingerprint) {
  const name = getDeviceOSName(deviceFingerprint);
  const version = getDeviceOSVersion(deviceFingerprint) || '';
  return name ? `${name} ${version}` : OSTypes.Unknown;
}

export function getDeviceBrowserTypeByString(name) {
  if (!name) {
    return BrowserTypes.Unknown;
  }
  const value = Object.values(BrowserTypes).find((type) => new RegExp(type, 'i').test(name));
  return value || BrowserTypes.Other;
}

export function getDeviceBrowserType(deviceFingerprint) {
  const str = getDeviceBrowserName(deviceFingerprint);
  return getDeviceBrowserTypeByString(str);
}

export function getDeviceBrowserLabel(deviceFingerprint) {
  const name = getDeviceBrowserName(deviceFingerprint);
  const version = getDeviceBrowserMajor(deviceFingerprint) || '';
  return name ? `${name} ${version}` : BrowserTypes.Unknown;
}

export function getDeviceType(deviceFingerprint) {
  const platformType = getDevicePlatformType(deviceFingerprint);
  const os = getDeviceOSType(deviceFingerprint);

  switch (platformType) {
    case PlatformTypes.WebDesktop:
      return DeviceTypes.Desktop;
    case PlatformTypes.WebMobile:
      return getDeviceTypeValue(deviceFingerprint);
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

export function getAnalyticsDeviceIcon(name, deviceType) {
  if (deviceType === DevicesTableTypes.browsers) {
    return BrowserIcons[getDeviceBrowserTypeByString(name)];
  }
  return getDeviceTypeByString(name) === DeviceTypes.Desktop
    ? DesktopGrayIcon
    : DeviceIcons[DeviceTypes.Mobile];
}
