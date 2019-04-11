import React from 'react'
import Items from 'src/components/items'
import Support from 'src/fragments/account/support'
import WebhooksDocsPanel from 'src/fragments/integration/webhooks-docs-panel'
import WebhooksTestPanel from 'src/fragments/integration/webhooks-test-panel'

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
