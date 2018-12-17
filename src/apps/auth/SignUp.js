import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl'
import { signUp } from 'src/state/auth'
import SignUpForm from 'src/components/sign-up-form'
import CSS from './Auth.css'
import MatiLogo from 'src/assets/mati-logo.svg'

export default
@connect(
  null,
  { signUp }
)
@injectIntl
class SignUp extends React.Component {
  handleSubmit = data => {
    return this.props.signUp(data).then(() => {
      this.props.history.push('/auth/additional-info')
    })
  }
  render() {
    return (
      <React.Fragment>
        <MatiLogo className={CSS.logo} />
        <h1 className={'mgi-page-title--light ' + CSS.title}>
          <FormattedMessage id="signup.title" />
          <p className="text-secondary">
            <FormattedMessage id="signup.subtitle" />
          </p>
        </h1>

        <SignUpForm handleSubmit={this.handleSubmit} />

        <div className={CSS.haveAccount}>
          <small>
            <FormattedMessage id="signup.haveAccount" />{' '}
            <Link to="/auth/signin">
              <FormattedMessage id="signup.haveAccount.link" />
            </Link>
          </small>
        </div>
        <p className="text-secondary">
          <small>
            <FormattedHTMLMessage id="terms-of-conditions" />
          </small>
        </p>
      </React.Fragment>
    )
  }
}
