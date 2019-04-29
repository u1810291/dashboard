import React from 'react'
import { connect } from 'react-redux'
import { pick, fromPairs, toPairs } from 'lodash'
import { Link } from 'react-router-dom'
import { transform } from 'inflection'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { signUp } from 'src/state/auth'
import { getIntegrationCode } from 'src/state/merchant'
import { updateData } from 'src/lib/intercom'
import SignUpForm from 'src/fragments/signup/sign-up-form'
import CSS from './Auth.css'
import { ReactComponent as MatiLogo } from 'src/assets/mati-logo.svg'

class SignUp extends React.Component {
  handleSubmit = async data => {
    const intercomFields = pick(data, 'verificationNum', 'websiteUrl')
    await this.props.signUp(
      pick(data, 'firstName', 'lastName', 'email', 'password')
    )
    this.props.getIntegrationCode(this.props.token)
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
            <FormattedHTMLMessage id="terms-of-conditions" />
          </span>
        </p>
      </React.Fragment>
    )
  }
}

export default connect(
  state => ({ token: state.auth.token }),
  { signUp, getIntegrationCode }
)(SignUp)
