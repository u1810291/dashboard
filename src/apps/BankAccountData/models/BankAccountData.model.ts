import { CountryCodes } from 'models/Country.model';
import { InputTypes, InputStatus } from 'models/Input.model';
import { VerificationResponse } from 'models/VerificationOld.model';

export const SUPPORTED_COUNTRIES = [
  CountryCodes.BR,
  CountryCodes.CO,
  CountryCodes.MX,
  CountryCodes.AR,
  CountryCodes.CL,
  CountryCodes.PE,
] as const;

export enum BankAccountDataCheckTypes {
  Accounts = 'Accounts',
  Balance = 'Balance',
  Identity = 'Identity',
  Transactions = 'Transactions',
}

export enum BankAccountDataSettingTypes {
  countryCodes = 'countryCodes'
}

export interface IBankAccountDataVerification {
  success: boolean;
}

export function getBankAccountData(verification: VerificationResponse): IBankAccountDataVerification | null {
  const bankAccountData = verification?.inputs.find((item: InputStatus) => item.id === InputTypes.FinancialInformationBankCredentialsRequest);

  if (!bankAccountData) {
    return null;
  }

  return {
    success: bankAccountData.data?.success || false,
  };
}
