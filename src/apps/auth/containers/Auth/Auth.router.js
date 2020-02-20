import PasswordRecovery from 'apps/auth/components/PasswordRecovery/PasswordRecovery';
import PasswordReset from 'apps/auth/components/PasswordReset/PasswordReset';
import SignIn from 'apps/auth/components/SignIn/SignIn';
import SignUp from 'apps/auth/components/SingUp/SignUp';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

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
