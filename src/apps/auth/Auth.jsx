import NotFound from 'apps/not-found';
import AuthLayout from 'components/auth-layout';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PasswordRecovery from './PasswordRecovery';
import PasswordReset from './PasswordReset';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Auth() {
  return (
    <AuthLayout>
      <Switch>
        <Route path="/auth/signup" component={SignUp} />
        <Route path="/auth/signin" component={SignIn} />
        <Route path="/auth/password-recovery" component={PasswordRecovery} />
        <Route path="/auth/password-reset/:token" component={PasswordReset} />
        <Route component={NotFound} />
      </Switch>
    </AuthLayout>
  );
}
