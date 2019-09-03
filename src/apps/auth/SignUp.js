import React from 'react'
import { connect } from 'react-redux'
import { pick, fromPairs, toPairs } from 'lodash'
import { Link } from 'react-router-dom'
import { transform } from 'inflection'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { signUp } from 'state/auth'
import {
  getIntegrationCode,
  saveConfiguration,
  getMerchant
} from 'state/merchant'
import { updateData } from 'lib/intercom'
import SignUpForm from 'fragments/signup/sign-up-form'
import CSS from './Auth.module.css'
import { ReactComponent as MatiLogo } from 'assets/mati-logo.svg'

class SignUp extends React.Component {
  handleSubmit = async data => {
    const intercomFields = pick(data, 'verificationNum', 'websiteUrl')
    await this.props.signUp(
      pick(data, 'firstName', 'lastName', 'email', 'password')
    )
    await this.props.getIntegrationCode(this.props.token)
    await this.props.getMerchant(this.props.token)
    await this.props.saveConfiguration(this.props.token, {
      dashboard: {
        ...this.props.merchant.dashboard,
        usePlans: true
      }
    })

    updateData(
      fromPairs(
        toPairs(intercomFields).map(([key, value]) => [
          transform(key, ['underscore', 'titleize']),
          value
        ])
      )
    )

    this.props.history.push('/auth/additional-info')
  }
  render() {
    return (
      <React.Fragment>
        <MatiLogo className={CSS.logo} />
        <h1 className={'text-light ' + CSS.title}>
          <FormattedMessage id="signup.title" />
          <p className="text-secondary">
            <FormattedMessage id="signup.subtitle" />
          </p>
        </h1>

        <SignUpForm handleSubmit={this.handleSubmit} />

        <div className={CSS.haveAccount}>
          <FormattedMessage id="signup.haveAccount" />{' '}
          <Link to="/auth/signin">
            <FormattedMessage id="signup.haveAccount.link" />
          </Link>
        </div>
        <p className="text-secondary">
          <span>
            <FormattedHTMLMessage id="terms-of-conditions" defaultMessage="" />
          </span>
        </p>
      </React.Fragment>
    )
  }
}

export default connect(
  state => ({ token: state.auth.token, merchant: state.merchant }),
  { signUp, getIntegrationCode, saveConfiguration, getMerchant }
)(SignUp)
