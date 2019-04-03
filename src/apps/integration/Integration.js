import React from 'react'
import Support from 'src/fragments/account/support'
import IntegrationSteps from 'src/fragments/integration/integration-steps'

export default function Info() {
  return (
    <React.Fragment>
      <main>
        <IntegrationSteps />
      </main>
      <aside>
        <Support />
      </aside>
    </React.Fragment>
  )
}
