import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { putMerchants } from 'src/state/merchant'
import AdditionalInfoForm from 'src/fragments/signup/additional-info-form'
import CSS from './Auth.css'
import MatiLogo from 'src/assets/mati-logo.svg'

export default
@connect(
  state => ({ token: state.auth.token }),
  { putMerchants }
)
@injectIntl
class AdditionalInfo extends React.Component {
  handleSubmit = data => {
    return this.props.putMerchants(this.props.token, data).then(() => {
      this.props.history.push('/')
    })
  }
  render() {
    return (
      <React.Fragment>
        <MatiLogo className={CSS.logo} />
        <h1 className={'text-light ' + CSS.title}>
          <FormattedMessage id="additionalInfo.title" />
          <p className="text-secondary">
            <FormattedMessage id="additionalInfo.subtitle" />
          </p>
        </h1>
        <AdditionalInfoForm handleSubmit={this.handleSubmit} />
      </React.Fragment>
    )
  }
}
