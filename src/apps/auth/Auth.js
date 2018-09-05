import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { SignUp, SignIn, PasswordRecovery } from '.'
import { NotFound } from 'src/apps/not-found'

export default function Auth(props) {
  return (
    <Switch>
      <Route path="/auth/signup" component={SignUp} />
      <Route path="/auth/signin" component={SignIn} />
      <Route path="/auth/password-recovery" component={PasswordRecovery} />
      <Route component={NotFound} />
    </Switch>
  )
}
