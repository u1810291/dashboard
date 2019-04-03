import React from 'react'
import IntlProvider from 'src/components/intl-provider'

export default function intlDecorator(story) {
  return <IntlProvider>{story()}</IntlProvider>
}
