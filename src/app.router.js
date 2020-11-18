import { Auth, PrivateRoute } from 'apps/auth';
import { Dashboard } from 'apps/dashboard';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Routes } from './models/Router.model';

export function AppRouter() {
  return (
    <Switch>
      <Route path={Routes.auth.root} component={Auth} />
      <PrivateRoute path={Routes.root} component={Dashboard} />
    </Switch>
  );
}
