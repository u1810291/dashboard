export enum InputTypes {
  ConnectionData = 'connection-data',
  FinancialInformationBankCredentialsRequest = 'financial-information-bank-credentials-request',
  FinancialInformationWorkCredentialsRequest = 'financial-information-work-credentials-request',
  FinancialInformationPayrollCredentialsRequest = 'financial-information-payroll-credentials-request',
}

export interface InputStatus<T = any> {
  id: InputTypes;
  data?: T;
  group?: number;
  status?: 0 | 100 | 200;
  optional?: boolean;
}
