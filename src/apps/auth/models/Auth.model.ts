const SIGNUP_TOKEN = 'RAW6M43YJVAT6P8';

export interface BlockedErrorDetails {
  email: string;
  firstName: string;
  lastName: string;
}

export enum AuthInputTypes {
  Password = 'password',
  OldPassword = 'oldPassword',
  RepeatPassword = 'repeatPassword',
  Email = 'email',
}

export function isValidCheckSum(token) {
  return token === SIGNUP_TOKEN;
}
