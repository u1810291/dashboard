import React from 'react'
import { last } from 'lodash'
const Intl = jest.genMockFromModule('react-intl')

// Here goes intl context injected into component, feel free to extend
const intl = {
  formatMessage: ({ defaultMessage }) => defaultMessage
}

Intl.injectIntl = Node => {
  const renderWrapped = props => <Node {...props} intl={intl} />
  renderWrapped.displayName = Node.displayName || Node.name || 'Component'
  return renderWrapped
}

Intl.FormattedMessage = ({ id }) => last(id.split('.'))
Intl.FormattedHTMLMessage = Intl.FormattedMessage

module.exports = Intl
