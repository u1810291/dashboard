import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getMerchantApps } from 'state/merchant'
import GooglePlayLink from 'fragments/integration/google-play-link'

function MobileDemo({ getMerchantApps, token, clientId }) {
  useEffect(() => {
    getMerchantApps(token)
  })
  return (
    <React.Fragment>
      <main>
        <GooglePlayLink clientId={clientId} />
      </main>
    </React.Fragment>
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
