import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { devWarn } from 'lib/console';
import { PrimitiveType } from 'lib/types';

interface MessageDescriptor<T> {
  id: string;
  messageValues?: Record<string, T>;
  defaultMessage?: string;
}

type FormatMessage = {
  (param: MessageDescriptor<PrimitiveType>): string;
  (param: MessageDescriptor<JSX.Element>): React.ReactNode;
}

export function useFormatMessage(): FormatMessage {
  const intl = useIntl();

  return useCallback((descriptor: MessageDescriptor<any>): any => {
    if (!descriptor.id) {
      devWarn('Format message id shouldn\'t be void');
      return '';
    }
    return intl.formatMessage({ id: descriptor.id, defaultMessage: descriptor.defaultMessage }, descriptor.messageValues);
  }, [intl]);
}
