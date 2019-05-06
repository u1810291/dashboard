import React from 'react'
import Items from 'components/items'
import {
  LetsStartPanel,
  VerificationPanel,
  ApplicationsPanel,
  InstallFrontendCodePanel,
  SetWebhooksPanel
} from 'fragments/integration/installation-guide-panels'

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
