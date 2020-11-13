import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PasswordReset from './components/PasswordReset/PasswordReset';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SingUp/SignUp';
import { PasswordRecovery } from './components/PasswordRecovery/PasswordRecovery';
import { Routes } from '../../models/Router.model';

export function AuthRouter() {
  return (
    <Switch>
      <Route path={Routes.auth.signUp} component={SignUp} />
      <Route path={Routes.auth.signIn} component={SignIn} />
      <Route path={Routes.auth.passwordRecovery} component={PasswordRecovery} />
      <Route path={Routes.auth.passwordReset} component={PasswordReset} />
    </Switch>
  );
}
