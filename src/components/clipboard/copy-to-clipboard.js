import React from 'react'
import { FormattedMessage } from 'react-intl'
import clipboard from 'clipboard-polyfill'
import { notification } from 'src/components/notification'

export default function copyToClipboard(text) {
  clipboard.writeText(text)
  notification.info(<FormattedMessage id="copied" />)
}
