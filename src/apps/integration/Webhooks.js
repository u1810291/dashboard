import React from 'react'
import Items from 'components/items'
import Support from 'fragments/account/support'
import WebhooksDocsPanel from 'fragments/integration/webhooks-docs-panel'
import WebhooksTestPanel from 'fragments/integration/webhooks-test-panel'

export default function Info() {
  return (
    <React.Fragment>
      <main>
        <Items flow="row" gap={4}>
          <WebhooksDocsPanel />
          <WebhooksTestPanel />
        </Items>
      </main>
      <aside>
        <Support />
      </aside>
    </React.Fragment>
  )
}
