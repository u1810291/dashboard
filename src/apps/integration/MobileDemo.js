import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getMerchantApps } from 'src/state/merchant'
import GooglePlayLink from 'src/fragments/integration/google-play-link'

function MobileDemo({ getMerchantApps, token, clientApplicationsList }) {
  useEffect(() => {
    getMerchantApps(token)
  })
  return (
    <React.Fragment>
      <main>
        <GooglePlayLink clientApplicationsList={clientApplicationsList} />
      </main>
    </React.Fragment>
  )
}

export default connect(
  ({ auth: { token }, merchant: { apps } }) => ({
    clientApplicationsList: apps || [],
    token
  }),
  {
    getMerchantApps
  }
)(MobileDemo)
