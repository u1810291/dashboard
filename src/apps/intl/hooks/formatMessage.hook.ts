import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { devWarn } from 'lib/console';

interface MessageDescriptor<T> {
  messageValues?: Record<string, T>;
  defaultMessage?: string;
}

type FormatMessage = {
  (id: string, descriptor?: MessageDescriptor<string | number>): string;
  (id: string, descriptor?: MessageDescriptor<JSX.Element>): React.ReactNode;
}

export function useFormatMessage(): FormatMessage {
  const intl = useIntl();

  return useCallback((id: string, descriptor?: MessageDescriptor<any>): any => {
    if (!id) {
      devWarn('Format message id shouldn\'t be void');
      return '';
    }
    return intl.formatMessage({ id, defaultMessage: descriptor?.defaultMessage }, descriptor?.messageValues);
  }, [intl]);
}
