import { capitalize } from 'lodash';
import { ValidationError } from 'yup';
import restrictedDomains from './emailDomains.json';

export const ONLY_NUMBERS_REG_EXP = /[^0-9]/;
export const EMAIL_REG_EXP = /^[A-Z0-9._%+-]+@([A-Z0-9.-]+\.[A-Z]{2,63})$/i;
export const EMAIL_REG_EXP_FOR_FORMATTING = /"*[A-Z0-9._%+-]+@([A-Z0-9.-]+\.[A-Z]{2,63})"*/gi;
export const CLEAN_TEXT_REG_EXP = /^[^`~!@#$%^&*()+=[{\]}|\\'<,.>?";:]+$/;
export const SPECIAL_CHARACTERS_REG_EXP = /[ !"#$%&'()*+,\-./\\:;<=>?@[\]^_`{|}~]/;
export const PASSWORD_REG_EXP = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./\\:;<=>?@[\]^_`{|}~]).*$/;
export const TEXT_WITH_DASHES = /(?=\S*[-])([a-zA-Z0-9-]+)/gi;

export function isBusinessEmail(value) {
  const match = EMAIL_REG_EXP.exec(value.toLowerCase());
  return !(match && restrictedDomains.includes(match[1]));
}

export function password(value, message, field) {
  const PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/;

  if (!PASSWORD.test(value[field])) {
    return message;
  }
  return null;
}

export function validationHandler(error, intl, setError) {
  if (error instanceof ValidationError) {
    const message = capitalize(
      intl.formatMessage({ id: error.message }, error.params),
    );
    setError(message);
  } else {
    console.error(error);
    setError(capitalize(intl.formatMessage({ id: 'unknownError' })));
  }
}

export function validateMaxLength(name = '', limit) {
  if (name.length > limit) {
    return 'validations.tooLong';
  }
  return null;
}

// DIO-932 the backend requires you to send email inside quotes, otherwise @ will be considered a separator and the search will not work correctly
export function formatFragmentWithQuotes(value: string, fragmentRegExp: RegExp | RegExp[]): string {
  const fragmentsArray = Array.isArray(fragmentRegExp) ? fragmentRegExp : [fragmentRegExp];
  let resultValue = value;

  fragmentsArray.forEach((regExp) => {
    const matches = resultValue.match(regExp) || [];
    if (matches.length === 0) {
      return;
    }

    const formattedMatches = matches.map((match) => {
      let formatResult = match;
      if (formatResult[0] !== '"') {
        formatResult = `"${formatResult}`;
      }
      if (formatResult[formatResult.length - 1] !== '"') {
        formatResult = `${formatResult}"`;
      }

      return formatResult;
    });

    resultValue = formattedMatches.reduce((previous, current, index) => previous.replace(matches[index], current) || '', resultValue);
  });

  return resultValue;
}
