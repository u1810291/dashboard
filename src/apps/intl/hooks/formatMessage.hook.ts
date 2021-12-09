import React from 'react';
import { useIntl } from 'react-intl';

interface MessageDescriptor {
  id: string;
  values?: Record<string, string | number | boolean | null | undefined | Date>;
  description?: string;
  defaultMessage?: React.ReactNode;
}

export function useFormatMessage(): (descriptor: MessageDescriptor) => string {
  const intl = useIntl();

  return (descriptor: MessageDescriptor) => {
    if (!descriptor.id) {
      return '';
    }
    return intl.formatMessage({ id: descriptor.id }, descriptor.values);
  };
}
