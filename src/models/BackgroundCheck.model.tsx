import React from 'react';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { ReactComponent as RedShield } from 'assets/step-redShield.svg';
import { ReactComponent as GreenShield } from 'assets/step-greenShield.svg';
import { ReactComponent as ApprovedSVG } from 'assets/icon-approved.svg';
import { ReactComponent as LowRiskSVG } from 'assets/icon-low-risk.svg';
import { ReactComponent as HighRiskSVG } from 'assets/icon-high-risk.svg';
import { VerificationStepTypes } from './Step.model';

export enum BackgroundCheckSettingTypes {
  BackgroundChecksSetting = 'backgroundChecksSetting'
}

export enum BackgroundChecksTypes {
  CountryDependantSources = 'countryDependantSources'
}

export enum BackgroundCheckCountryTypes {
  Mexico = 'MX',
  Brazil = 'BR',
}

export const backgroundCheckCountriesOrder = [
  BackgroundCheckCountryTypes.Mexico,
  BackgroundCheckCountryTypes.Brazil,
];

export interface IBackgroundCheck {
  id: string;
  default: boolean | string;
  value?: boolean | string;
  options?: Record<string, any>;
}

export interface IBackgroundCheckConfiguration {
  country: BackgroundCheckCountryTypes;
  checks: IBackgroundCheck[];
}

export enum BackgroundCheckTypes {
  None = 'none',
  LIGHT = 'light',
  FULL = 'full',
}

export const BrazilGovCheckTypesForPattern = {
  [VerificationPatternTypes.BackgroundBrazilianChecks]: {
    NONE: BackgroundCheckTypes.None,
    LIGHT: BackgroundCheckTypes.LIGHT,
    FULL: BackgroundCheckTypes.FULL,
  },
};

export const backgroundCheckConfigurations: IBackgroundCheckConfiguration[] = [
  {
    country: BackgroundCheckCountryTypes.Mexico,
    checks: [
      {
        id: VerificationStepTypes.BackgroundMexicanBuholegal,
        default: false,
      },
    ],
  },
  {
    country: BackgroundCheckCountryTypes.Brazil,
    checks: [
      {
        id: VerificationStepTypes.BackgroundBrazilianChecks,
        default: BrazilGovCheckTypesForPattern[VerificationPatternTypes.BackgroundBrazilianChecks].NONE,
        options: {
          list: [
            // commented for release of background check
            // {
            //   id: VerificationStepTypes.BackgroundBrazilianChecksFull,
            //   title: 'Full check',
            //   value: BrazilGovCheckTypesForPattern[VerificationPatternTypes.BackgroundBrazilianChecks].FULL,
            // },
            {
              id: VerificationStepTypes.BackgroundBrazilianChecksLight,
              title: 'Light check',
              value: BrazilGovCheckTypesForPattern[VerificationPatternTypes.BackgroundBrazilianChecks].LIGHT,
            },
          ],
        },
      },
    ],
  },
];

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
  [VerificationStepTypes.BackgroundBrazilianChecks]: {
    results: {
      hidden: true,
    },
  },
};

export enum BackgroundCheckStatusesTypes {
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Approved = 'approved',
  LowRisk = 'lowRisk',
  HighRisk = 'highRisk',
}

export interface ICrawler {
  status: BackgroundCheckStatusesTypes;
}

export interface IBackgroundCheckStepData {
  name: string | null;
  curp: string | null;
  dateOfBirth: string | null;
  age: number | null;
  gender: string | null;
  status: BackgroundCheckStatusesTypes;
  resource: null;
  results?: ICrawler[];
  timestamp: null;
  stepExtra: any[];
}

export const backgroundCheckVerificationShieldIconsMap = {
  [BackgroundCheckStatusesTypes.Accepted]: <GreenShield />,
  [BackgroundCheckStatusesTypes.Rejected]: <RedShield />,
  [BackgroundCheckStatusesTypes.Approved]: <ApprovedSVG />,
  [BackgroundCheckStatusesTypes.LowRisk]: <LowRiskSVG />,
  [BackgroundCheckStatusesTypes.HighRisk]: <HighRiskSVG />,
};

export const BackgroundChecksSteps = [
  VerificationStepTypes.BackgroundMexicanBuholegal,
  VerificationStepTypes.BackgroundBrazilianChecks,
];

export const backgroundCheckVerificationPatterns: readonly VerificationPatternTypes[] = [
  VerificationPatternTypes.BackgroundMexicanBuholegal,
  VerificationPatternTypes.BackgroundBrazilianChecks,
];

export function backgroundCheckParse(list: IBackgroundCheck[], pattern): IBackgroundCheck[] {
  return list.map((item) => ({
    ...item,
    value: pattern[item.id] !== undefined ? pattern[item.id] : item.default,
  }));
}
