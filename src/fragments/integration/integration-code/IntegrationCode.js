import React from 'react'
import { FormattedMessage } from 'react-intl'
import Card from 'components/card'
import Button from 'components/button'
import Items from 'components/items'
import SyntaxHighlighter from 'components/syntax-highlighter'

export default function IntegrationCode({ integrationCode }) {
  return (
    <Card>
      <Items flow="row">
        <h3>
          <FormattedMessage id="fragments.integration.integration-code.title" />
        </h3>
        <Items gap={1} justifyContent="start">
          <Button buttonStyle="primary" size="small">
            <FormattedMessage id="fragments.integration.integration-code.javascript" />
          </Button>
          <Button buttonStyle="default" disabled size="small">
            <FormattedMessage id="fragments.integration.integration-code.react" />
          </Button>
          <Button buttonStyle="default" disabled size="small">
            <FormattedMessage id="fragments.integration.integration-code.angular" />
          </Button>
        </Items>
        <SyntaxHighlighter language="html" code={integrationCode} />
      </Items>
    </Card>
  )
}
