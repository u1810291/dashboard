import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import PasswordRecovery from './PasswordRecovery'
import { NotFound } from 'src/apps/not-found'
import AuthLayout from 'src/components/auth-layout'

@connect(state => ({ loggedIn: state.auth.token }))
export default class Auth extends React.Component {
  render() {
    return (
      <AuthLayout>
        <Switch>
          <Route path="/auth/signup" component={SignUp} />
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/password-recovery" component={PasswordRecovery} />
          <Route component={NotFound} />
        </Switch>
      </AuthLayout>
    )
  }
}
