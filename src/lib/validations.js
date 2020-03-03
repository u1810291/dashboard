import React from 'react';
import { FormattedMessage } from 'react-intl';
import restrictedDomains from './emailDomains';

export function required(value, asToken = false) {
  if (!value) {
    return asToken ? 'validations.required' : <FormattedMessage id="validations.required" />;
  }
  return null;
}

export function cleanText(value, asToken = false) {
  const CLEAN_TEXT = /^[^`~!@#$%^&*()+=[{\]}|\\'<,.>?";:]+$/;
  if (!CLEAN_TEXT.test(value)) {
    return asToken ? 'validations.cleanText' : <FormattedMessage id="validations.cleanText" />;
  }
  return null;
}

export function email(value, asToken = false) {
  const EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i;
  if (!EMAIL.test(value)) {
    return asToken ? 'validations.email' : <FormattedMessage id="validations.email" />;
  }
  return null;
}

export function businessEmail(value) {
  const EMAIL = /^[A-Z0-9._%+-]+@([A-Z0-9.-]+\.[A-Z]{2,63})$/i;
  const match = EMAIL.exec(value.toLowerCase());

  if (match && restrictedDomains.includes(match[1])) {
    return <FormattedMessage id="validations.personalEmail" />;
  }
  return null;
}

export function password(value, message, field) {
  const PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/;

  if (!PASSWORD.test(value[field])) {
    return message;
  }
  return null;
}
