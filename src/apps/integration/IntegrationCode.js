import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getIntegrationCode } from 'state/merchant'
import IntegrationCode from 'fragments/integration/integration-code'

function IntegrationCodePage({ integrationCode, getIntegrationCode, token }) {
  useEffect(() => {
    getIntegrationCode(token)
  })

  return (
    <IntegrationCode integrationCode={integrationCode} />
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
