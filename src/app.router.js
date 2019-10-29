import Auth from 'apps/auth/Auth';
import { Dashboard } from 'apps/dashboard';
import { PrivateRoute } from 'apps/routing';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

export function AppRouter() {
  return (
    <Switch>
      <Route path="/auth" component={Auth} />
      <PrivateRoute path="/" component={Dashboard} />
    </Switch>
  );
}
