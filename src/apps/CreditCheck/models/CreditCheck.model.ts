import { CountrySpecificCreditChecks, DocumentStepTypes } from 'models/Step.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { VerificationResponse } from 'models/VerificationOld.model';

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

export function creditCheckParse(list: CreditCheck[], pattern): CreditCheck[] {
  return list.map((item) => ({
    ...item,
    value: pattern[item.id] !== undefined ? pattern[item.id] : item.default,
  }));
}

export function creditIsInVerification(verification: VerificationResponse): boolean {
  return verification?.documents?.some((document) => {
    const creditChecksSteps = document?.steps.filter((step) => CountrySpecificCreditChecks.includes(step.id));
    return creditChecksSteps?.length > 0;
  });
}
