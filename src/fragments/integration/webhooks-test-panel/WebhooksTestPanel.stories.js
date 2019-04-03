import React from 'react'
import { storiesOf } from '@storybook/react'
import WebhooksTestPanel from '.'

storiesOf('fragments/integration/WebhooksTestPanel', module).add(
  'default',
  () => <WebhooksTestPanel />
)
