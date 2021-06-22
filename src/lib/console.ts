/* eslint-disable no-console */
import { isProduction } from '../models/Environment.model';

export function devLog(...args) {
  if (isProduction) {
    return;
  }
  console.log(...args);
}

export function devWarn(...args) {
  if (isProduction) {
    return;
  }
  console.warn(...args);
}

export function devInfo(...args) {
  if (isProduction) {
    return;
  }
  console.info(...args);
}
