import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import WebhooksDocsPanel from '.'
import { Container } from 'components/overlay'

storiesOf('fragments/integration/WebhooksDocsPanel', module).add(
  'Default',
  () => (
    <React.Fragment>
      <Container />
      <BrowserRouter>
        <WebhooksDocsPanel />
      </BrowserRouter>
    </React.Fragment>
  )
)
