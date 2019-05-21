import React from 'react'
import { transform } from 'inflection'
import AdditionalInfoForm from 'fragments/signup/additional-info-form'
import CSS from './Auth.module.css'
import { ReactComponent as MatiLogo } from 'assets/mati-logo.svg'
import { setUserProperties, trackEvent } from 'lib/mixpanel'
import { updateData } from 'lib/intercom'

export default class AdditionalInfo extends React.Component {
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
