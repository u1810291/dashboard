import { PrivateRoute } from 'apps/auth';
import { Loader } from 'apps/dashboard/components/Loader/Loader';
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Routes } from './models/Router.model';

const DashboardLazy = lazy(async () => {
  const { Dashboard } = await import('apps/dashboard');
  return { default: Dashboard };
});

const AuthLazy = lazy(async () => {
  const { Auth } = await import('apps/auth');
  return { default: Auth };
});

const ReviewModeLazy = lazy(async () => {
  const { ReviewMode } = await import('apps/reviewMode');
  return { default: ReviewMode };
});

export function AppRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path={Routes.auth.root} component={AuthLazy} />
        <PrivateRoute path={Routes.review.root} component={ReviewModeLazy} />
        <PrivateRoute path={Routes.root} component={DashboardLazy} />
      </Switch>
    </Suspense>
  );
}
