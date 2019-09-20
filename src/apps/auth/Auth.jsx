import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import NotFound from 'apps/not-found';
import AuthLayout from 'components/auth-layout';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PasswordRecovery from './PasswordRecovery';
import PasswordReset from './PasswordReset';

function Auth() {
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

export default connect((state) => ({ loggedIn: state.auth.token }))(Auth);
