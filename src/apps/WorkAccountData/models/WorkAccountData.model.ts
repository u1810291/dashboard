import { CountryCodes } from 'models/Country.model';
import { InputTypes, InputStatus } from 'models/Input.model';
import { VerificationResponse } from 'models/Verification.model';

export const SUPPORTED_COUNTRIES = [
  CountryCodes.BR,
  CountryCodes.CO,
  CountryCodes.MX,
] as const;

export enum WorkAccountDataCheckTypes {
  Identity = 'Identity',
  Transactions = 'Transactions',
  Reputation = 'Reputation',
}

export enum WorkAccountDataSettingTypes {
  countryCodes = 'countryCodes'
}

export interface IWorkAccountDataVerification {
  success: boolean;
}

export function getWorkAccountData(verification: VerificationResponse): IWorkAccountDataVerification | null {
  const workAccountData = verification.inputs.find((item: InputStatus) => item.id === InputTypes.FinancialInformationWorkCredentialsRequest);

  if (!workAccountData) {
    return null;
  }

  return {
    success: workAccountData.data?.success || false,
  };
}
