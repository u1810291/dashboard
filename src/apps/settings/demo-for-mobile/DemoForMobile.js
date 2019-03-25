import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { getMerchantApps } from 'src/state/merchant'
import GooglePlayLink from 'src/fragments/account/google-play-link'
import SettingsLayout from '../SettingsLayout'

export default
@connect(
  ({ auth: { token }, merchant: { apps } }) => ({
    clientApplicationsList: apps || [],
    token
  }),
  {
    getMerchantApps
  }
)
class DemoForMobile extends React.Component {
  componentDidMount() {
    const { getMerchantApps, token } = this.props
    getMerchantApps(token)
  }

  render() {
    const { clientApplicationsList } = this.props
    return (
      <React.Fragment>
        <h1>
          <FormattedMessage id="settings.demo_for_mobile" />
        </h1>
        <SettingsLayout>
          <main>
            <GooglePlayLink clientApplicationsList={clientApplicationsList} />
          </main>
        </SettingsLayout>
      </React.Fragment>
    )
  }
}
