import React from 'react'
import { FormattedMessage } from 'react-intl'
import Support from 'src/fragments/account/support'
import IntegrationSteps from 'src/fragments/integration/integration-steps'
import IntegrationLayout from './IntegrationLayout'

export default function Info() {
  return (
    <React.Fragment>
      <h1>
        <FormattedMessage id="apps.integration.menu.integration" />
      </h1>
      <IntegrationLayout>
        <main>
          <IntegrationSteps />
        </main>
        <aside>
          <Support />
        </aside>
      </IntegrationLayout>
    </React.Fragment>
  )
}
