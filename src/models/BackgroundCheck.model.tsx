import React from 'react';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { ReactComponent as RedShield } from 'assets/step-redShield.svg';
import { ReactComponent as GreenShield } from 'assets/step-greenShield.svg';
import { VerificationStepTypes } from './Step.model';

export enum BackgroundCheckSettingTypes {
  BackgroundChecksSetting = 'backgroundChecksSetting'
}

export enum BackgroundChecksTypes {
  CountryDependantSources = 'countryDependantSources'
}

export enum BackgroundCheckCountryTypes {
  Mexico = 'MX',
}

export const backgroundCheckCountriesOrder = [
  BackgroundCheckCountryTypes.Mexico,
];

export interface BackgroundCheck {
  id: string;
  default: boolean;
  value?: boolean;
}

export interface BackgroundCheckConfiguration {
  country: BackgroundCheckCountryTypes;
  checks: BackgroundCheck[];
}

export const backgroundCheckConfigurations: BackgroundCheckConfiguration[] = [{
  country: BackgroundCheckCountryTypes.Mexico,
  checks: [
    {
      id: VerificationStepTypes.BackgroundMexicanBuholegal,
      default: false,
    },
  ],
}];

export const backgroundCheckDisplayOptions = {
  [VerificationStepTypes.BackgroundMexicanBuholegal]: {
    resource: {
      hidden: true,
    },
    timestamp: {
      hidden: true,
    },
    stepExtra: {
      hidden: true,
    },
    lastSurname: {
      hidden: true,
    },
  },
};

export enum BackgroundCheckStatuses {
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

export interface BackgroundCheckStepData {
  name: string | null;
  curp: string | null;
  dateOfBirth: string | null;
  age: number | null;
  gender: string | null;
  status: BackgroundCheckStatuses;
  resource: null;
  timestamp: null;
  stepExtra: any[];
}

export const backgroundCheckVerificationShieldIconsMap = {
  [BackgroundCheckStatuses.Accepted]: <GreenShield />,
  [BackgroundCheckStatuses.Rejected]: <RedShield />,
};

export const BackgroundChecksSteps = [
  VerificationStepTypes.BackgroundMexicanBuholegal,
];

export const backgroundCheckVerificationPatterns: readonly VerificationPatternTypes[] = [
  VerificationPatternTypes.BackgroundMexicanBuholegal,
];

export function backgroundCheckParse(list: BackgroundCheck[], pattern): BackgroundCheck[] {
  return list.map((item) => ({
    ...item,
    value: pattern[item.id] !== undefined ? pattern[item.id] : item.default,
  }));
}
