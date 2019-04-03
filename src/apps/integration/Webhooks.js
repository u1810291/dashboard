import React from 'react'
import Sections from 'src/components/sections'
import Support from 'src/fragments/account/support'
import WebhooksDocsPanel from 'src/fragments/integration/webhooks-docs-panel'
import WebhooksTestPanel from 'src/fragments/integration/webhooks-test-panel'

export default function Info() {
  return (
    <React.Fragment>
      <main>
        <Sections extraGap>
          <WebhooksDocsPanel />
          <WebhooksTestPanel />
        </Sections>
      </main>
      <aside>
        <Support />
      </aside>
    </React.Fragment>
  )
}
