import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PasswordRecovery from './components/PasswordRecovery/PasswordRecovery';
import PasswordReset from './components/PasswordReset/PasswordReset';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SingUp/SignUp';

export function AuthRouter() {
  return (
    <Switch>
      <Route path="/auth/signup" component={SignUp} />
      <Route path="/auth/signin" component={SignIn} />
      <Route path="/auth/password-recovery" component={PasswordRecovery} />
      <Route path="/auth/password-reset/:token" component={PasswordReset} />
    </Switch>
  );
}
