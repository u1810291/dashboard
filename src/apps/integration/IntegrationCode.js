import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getIntegrationCode } from 'state/merchant'
import Support from 'fragments/account/support'
import MatiDocs from 'fragments/account/mati-docs'
import IntegrationCode from 'fragments/integration/integration-code'

function IntegrationCodePage({ integrationCode, getIntegrationCode, token }) {
  useEffect(() => {
    getIntegrationCode(token)
  })

  return (
    <React.Fragment>
      <main>
        <IntegrationCode integrationCode={integrationCode} />
        <MatiDocs />
      </main>
      <aside>
        <Support />
      </aside>
    </React.Fragment>
  )
}

export default connect(
  ({ auth: { token }, merchant: { integrationCode } }) => ({
    token,
    integrationCode
  }),
  {
    getIntegrationCode
  }
)(IntegrationCodePage)
