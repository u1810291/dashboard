import React from 'react'
import Items from 'components/items'
import WebhooksTestPanel from 'fragments/integration/webhooks-test-panel'
import IntegrationLayout from './IntegrationLayout'

export default function Info() {
  return (
    <IntegrationLayout>
      <main>
        <Items flow="row" gap={4}>
          <WebhooksTestPanel />
        </Items>
      </main>
    </IntegrationLayout>
  )
}
