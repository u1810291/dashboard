import moment from 'moment';

export function getSignUpToken() {
  const now = moment().format('YYYYMMDD');
  const checkSum = ((Number(now) - 1) % 9) + 1;
  return `${now}${checkSum}`;
}

export function isValidCheckSum(token) {
  return token === getSignUpToken();
}
