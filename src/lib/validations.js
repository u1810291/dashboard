import React from 'react';
import { FormattedMessage } from 'react-intl';

export function required(value) {
  if (!value) {
    return <FormattedMessage id="validations.required" />;
  }
}

export function cleanText(value) {
  const CLEAN_TEXT = /^[^`~!@#$%^&*()+=[{\]}|\\'<,.>?";:]+$/;
  if (!CLEAN_TEXT.test(value)) {
    return <FormattedMessage id="validations.cleanText" />;
  }
}

export function email(value) {
  const EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!EMAIL.test(value)) {
    return <FormattedMessage id="validations.email" />;
  }
}

export function password(value, message, field) {
  const PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/;

  if (!PASSWORD.test(value[field])) {
    return message;
  } else {
    return undefined;
  }
}
