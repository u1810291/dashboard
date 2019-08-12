import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getMerchantApps } from 'state/merchant'
import GooglePlayLink from 'fragments/integration/google-play-link'
import IntegrationLayout from './IntegrationLayout'

function MobileDemo({ getMerchantApps, token, clientId }) {
  useEffect(() => {
    getMerchantApps(token)
  }, [token, getMerchantApps])
  return (
    <IntegrationLayout>
      <main>
        <GooglePlayLink clientId={clientId} />
      </main>
    </IntegrationLayout>
  )
}

export default connect(
  ({ auth: { token }, merchant: { apps } }) => ({
    clientApplicationsList: apps || [],
    clientId: ((apps || [])[0] || {}).clientId,
    token
  }),
  {
    getMerchantApps
  }
)(MobileDemo)
