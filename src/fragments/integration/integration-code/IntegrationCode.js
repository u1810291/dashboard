import React from 'react'
import { FormattedMessage } from 'react-intl'
import Panel from 'src/components/panel'
import Button from 'src/components/button'
import Items from 'src/components/items'
import Sections from 'src/components/sections'
import SyntaxHighlighter from 'src/components/syntax-highlighter'

export default function IntegrationCode({ integrationCode }) {
  return (
    <Panel.Body>
      <Sections>
        <h3>
          <FormattedMessage id="fragments.integration.integration-code.title" />
        </h3>
        <Items smallGap>
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
      </Sections>
    </Panel.Body>
  )
}
