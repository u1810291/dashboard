import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { getMerchantApps } from 'src/state/merchant'
import GooglePlayLink from 'src/fragments/account/google-play-link'
import SettingsCSS from '../Settings.scss'

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
      <div>
        <h2>
          <FormattedMessage id="settings.demo_for_mobile" />
        </h2>
        <div className={SettingsCSS.centralBlock}>
          <GooglePlayLink clientApplicationsList={clientApplicationsList} />
        </div>
      </div>
    )
  }
}
