import React from 'react'
import { connect } from 'react-redux'
import { putMerchants } from 'src/state/merchant'
import AdditionalInfoForm from 'src/fragments/signup/additional-info-form'
import CSS from './Auth.css'
import MatiLogo from 'src/assets/mati-logo.svg'
import { setUserProperties } from 'src/lib/mixpanel'
import { updateData } from 'src/lib/intercom'
import { showVideo } from 'src/fragments/configuration/onboarding-video'

export default
@connect(
  state => ({ token: state.auth.token }),
  { putMerchants }
)
class AdditionalInfo extends React.Component {
  handleSubmit = data => {
    setUserProperties(data)
    updateData(data)
    setTimeout(() => showVideo(), 1000)
    this.props.history.push('/')
  }

  render() {
    return (
      <React.Fragment>
        <MatiLogo className={CSS.logo} />
        <AdditionalInfoForm handleSubmit={this.handleSubmit} />
      </React.Fragment>
    )
  }
}
