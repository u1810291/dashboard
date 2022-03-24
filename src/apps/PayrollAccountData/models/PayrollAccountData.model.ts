import { CountryCodes } from 'models/Country.model';
import { InputTypes, InputStatus } from 'models/Input.model';
import { VerificationResponse } from 'models/VerificationOld.model';

export const SUPPORTED_COUNTRIES = [
  CountryCodes.BR,
  CountryCodes.CO,
  CountryCodes.MX,
] as const;

export enum PayrollAccountDataCheckTypes {
  Accounts = 'Accounts',
  Identity = 'Identity',
  EmploymentDetails = 'EmploymentDetails',
  Income = 'Income',
}

export enum PayrollAccountDataSettingTypes {
  countryCodes = 'countryCodes'
}

export interface IPayrollAccountDataVerification {
  success: boolean;
}

export function getPayrollAccountData(verification: VerificationResponse): IPayrollAccountDataVerification | null {
  const payrollAccountData = verification?.inputs.find((item: InputStatus) => item.id === InputTypes.FinancialInformationPayrollCredentialsRequest);

  if (!payrollAccountData) {
    return null;
  }

  return {
    success: payrollAccountData.data?.success || false,
  };
}
