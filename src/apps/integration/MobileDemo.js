import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getMerchantApps } from 'src/state/merchant'
import { FormattedMessage } from 'react-intl'
import GooglePlayLink from 'src/fragments/integration/google-play-link'
import IntegrationLayout from './IntegrationLayout'

function MobileDemo({ getMerchantApps, token, clientApplicationsList }) {
  useEffect(() => {
    getMerchantApps(token)
  })
  return (
    <React.Fragment>
      <h1>
        <FormattedMessage id="apps.integration.menu.mobile_demo" />
      </h1>
      <IntegrationLayout>
        <main>
          <GooglePlayLink clientApplicationsList={clientApplicationsList} />
        </main>
      </IntegrationLayout>
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
