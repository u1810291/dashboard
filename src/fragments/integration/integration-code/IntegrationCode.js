import React from 'react'
import { FormattedMessage } from 'react-intl'
import Items from 'components/items'
import SyntaxHighlighter from 'components/syntax-highlighter'
import MatiDocs from 'fragments/account/mati-docs'

export default function IntegrationCode({ integrationCode }) {
  return (
    <Items flow="column" templateColumns="2fr 1fr" gap={2}>
      <Items flow="row">
        <h3>
          <FormattedMessage id="fragments.integration.integration-code.titleWeb" />
        </h3>
        <SyntaxHighlighter language="html" code={integrationCode} />
      </Items>
      <Items flow="row" gap={2}>
        <h3>
          <FormattedMessage id="fragments.integration.integration-code.titleMobile" />
        </h3>
        <MatiDocs />
      </Items>
    </Items>
  )
}
