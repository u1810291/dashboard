import React from 'react';
import { FormattedMessage } from 'react-intl';
import * as clipboard from 'clipboard-polyfill';
import { notification } from 'components/notification';

export function copyToClipboard(text) {
  clipboard.writeText(text);
  notification.info(<FormattedMessage id="copied" />);
}
