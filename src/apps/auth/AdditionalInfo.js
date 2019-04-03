import React from 'react'
import { connect } from 'react-redux'
import { transform } from 'inflection'
import { putMerchants } from 'src/state/merchant'
import AdditionalInfoForm from 'src/fragments/signup/additional-info-form'
import CSS from './Auth.css'
import MatiLogo from 'src/assets/mati-logo.svg'
import { setUserProperties, trackEvent } from 'src/lib/mixpanel'
import { updateData } from 'src/lib/intercom'
import { showVideo } from 'src/fragments/configuration/onboarding-video'

class AdditionalInfo extends React.Component {
  handleSubmit = data => {
    setUserProperties(data)
    updateData(
      Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          transform(key, ['underscore', 'titleize']),
          value
        ])
      )
    )
    trackEvent('dash_completed_additional_questions')
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

export default connect(
  state => ({ token: state.auth.token }),
  { putMerchants }
)(AdditionalInfo)
