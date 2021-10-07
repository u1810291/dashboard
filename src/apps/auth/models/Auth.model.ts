const SIGNUP_TOKEN = 'RAW6M43YJVAT6P8';

export enum AuthInputTypes {
  Password = 'password',
  Email = 'email',
}

export function isValidCheckSum(token) {
  return token === SIGNUP_TOKEN;
}
