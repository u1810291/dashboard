import React from 'react'
import Sections from 'src/components/sections'
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
        <Sections>
          <LetsStartPanel />
          <VerificationPanel />
          <ApplicationsPanel />
          <InstallFrontendCodePanel />
          <SetWebhooksPanel />
        </Sections>
      </main>
    </React.Fragment>
  )
}
