import { InfoPage } from 'apps/FAQ';
import { VerificationFlows } from 'apps/flows';
import { forDevsRoutes } from 'apps/forDevelopers';
import { identityRoutes } from 'apps/identity';
import { Page404 } from 'apps/layout';
import { MerchantGuard, OwnerRoute } from 'apps/merchant';
import { Product } from 'apps/product';
import { Settings } from 'apps/settings';
import { Routes } from 'models/Router.model';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AnalyticsContainer } from '../../analytics';

export function DashboardRouter() {
  return (
    <Switch>
      <Redirect exact from={Routes.root} to={Routes.analytics.root} />
      <OwnerRoute path={Routes.settings.root} component={Settings} />
      <Route path={Routes.info.root} component={InfoPage} />
      <MerchantGuard>
        {identityRoutes}
        {forDevsRoutes}
        <OwnerRoute path={Routes.analytics.root} component={AnalyticsContainer} />
        <OwnerRoute exact path={Routes.flows.root} component={VerificationFlows} />
        <OwnerRoute path={Routes.flows.details} component={Product} />
        <Route path="*" component={Page404} />
      </MerchantGuard>
    </Switch>
  );
}
