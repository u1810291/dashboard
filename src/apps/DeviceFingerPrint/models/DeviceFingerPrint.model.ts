export enum DeviceFingerPrintCheckTypes {
  OS = 'os',
  Browser = 'browser',
  DeviceModelAndType = 'deviceModelAndType',
}

export enum DeviceFingerPrintSettingTypes {
  Advanced = 'advanced',
}

export interface DeviceFingerPrintInputData {
  ua: string;
  browser: {
    name: string;
    version: string;
    major: string;
  },
  engine: {
    name: string;
    version: string;
  },
  os: {
    name: string;
    version: string;
  },
  cpu: {
    architecture: string;
  },
  ip: string
  app: {
    platform: string;
    version: string;
  }
}
