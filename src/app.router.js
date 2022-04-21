import { PrivateRoute } from 'apps/auth';
import { Loader } from 'apps/ui';
import { Routes } from 'models/Router.model';
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { WithAgent } from 'models/Collaborator.model';
import { selectMerchantAgentNotesConfig } from 'state/merchant/merchant.selectors';
import { RoleGuardRoute } from 'apps/routing';

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
  const agentNotesConfig = useSelector(selectMerchantAgentNotesConfig);

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path={Routes.auth.root} component={AuthLazy} />
        {!agentNotesConfig?.requiredOnChangeVerificationStatus && (
          <RoleGuardRoute roles={WithAgent} path={Routes.review.root} component={ReviewModeLazy} />
        )}
        <PrivateRoute path={Routes.root} component={DashboardLazy} />
      </Switch>
    </Suspense>
  );
}
