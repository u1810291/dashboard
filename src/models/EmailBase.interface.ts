export interface BaseStepError {
  type: string;
  code: string;
  message: string;
}

export interface EmailValidationData {
  emailAddress: string;
}

export interface BaseEmailStep<D = EmailValidationData, E = BaseStepError> {
  status: number;
  id: string;
  error: E;
  data?: D;
}
