import { DocumentStepTypes } from 'models/Step.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';

export enum CreditCheckSettingTypes {
  CountriesCreditChecks = 'countriesCreditChecks'
}

export enum CreditChecksTypes {
  CreditDatabaseCheck = 'creditDatabaseCheck'
}

export const verificationPatternsCreditChecksDefault = {
  [VerificationPatternTypes.CreditArgentinianFidelitas]: false,
  [VerificationPatternTypes.CreditBrazilianSerasa]: false,
};

export enum CreditCheckCountryTypes {
  Argentina = 'AR',
  Brazil = 'BR',
}

export const creditCheckCountriesOrder = [
  CreditCheckCountryTypes.Argentina,
  CreditCheckCountryTypes.Brazil,
];

export interface CreditCheck {
  id: string;
  default: boolean;
  value?: boolean;
}

export interface CreditCheckConfiguration {
  country: CreditCheckCountryTypes;
  checks: CreditCheck[];
}

export const CreditCheckConfigurations: CreditCheckConfiguration[] = [{
  country: CreditCheckCountryTypes.Argentina,
  checks: [
    {
      id: DocumentStepTypes.CreditArgentinianFidelitas,
      default: false,
    },
  ],
},
{
  country: CreditCheckCountryTypes.Brazil,
  checks: [
    {
      id: DocumentStepTypes.CreditBrazilianSerasa,
      default: false,
    },
  ],
}];

export const creditCheckDisplayOptions = {
  [DocumentStepTypes.CreditArgentinianFidelitas]: {
    stepExtra: {
      hidden: true,
    },
  },
  [DocumentStepTypes.CreditBrazilianSerasa]: {
    stepExtra: {
      hidden: true,
    },
  },
};

export function creditCheckParse(list: CreditCheck[], pattern): CreditCheck[] {
  return list.map((item) => ({
    ...item,
    value: pattern[item.id] !== undefined ? pattern[item.id] : item.default,
  }));
}
