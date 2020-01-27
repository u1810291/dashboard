import { Auth, PrivateRoute } from 'apps/auth';
import { Dashboard } from 'apps/dashboard';
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
