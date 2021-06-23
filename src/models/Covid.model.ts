import { isDateBetween } from '../lib/date';

export function isCovidTolerance(date: string, country: string) {
  if (!country || !date) {
    return false;
  }

  return isDateBetween(date, '2020-01-01', '2021-12-31') && country === 'CL';
}
