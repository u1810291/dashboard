import React from 'react'
import Items from 'src/components/items'
import {
  LetsStartPanel,
  VerificationPanel,
  ApplicationsPanel,
  InstallFrontendCodePanel,
  SetWebhooksPanel
} from 'src/fragments/integration/installation-guide-panels'

export default function Info() {
  return (
    <React.Fragment>
      <main>
        <Items flow="row">
          <LetsStartPanel />
          <VerificationPanel />
          <ApplicationsPanel />
          <InstallFrontendCodePanel />
          <SetWebhooksPanel />
        </Items>
      </main>
    </React.Fragment>
  )
}
