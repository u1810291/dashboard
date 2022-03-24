import { useIntl } from 'react-intl';
import { FieldBooleanPatterns, FieldMatchObjectPatterns, formatValue, includesPattern } from './string';

export function useFormattedValue(label: string, value: string, pattern: string[] = null, cb: (label: string, value: string) => any = null) {
  const intl = useIntl();

  if (pattern && cb && includesPattern(label, pattern)) {
    return cb(label, value);
  }

  if (includesPattern(label, FieldMatchObjectPatterns)) {
    const number = !Number.isNaN(value) ? parseInt(value, 10) : '??';
    return `${number}% ${intl.formatMessage({ id: 'identity.field.match' })}`;
  }

  if (includesPattern(label, FieldBooleanPatterns)) {
    return intl.formatMessage({
      id: value ? `identity.field.${label}.positive` : `identity.field.${label}.negative`,
      defaultMessage: intl.formatMessage({ id: value ? 'yes' : 'no' }),
    });
  }

  return formatValue(label, value);
}
