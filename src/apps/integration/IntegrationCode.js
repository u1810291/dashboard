import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getIntegrationCode } from 'src/state/merchant'
import Support from 'src/fragments/account/support'
import MatiDocs from 'src/fragments/account/mati-docs'
import IntegrationCode from 'src/fragments/integration/integration-code'

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
