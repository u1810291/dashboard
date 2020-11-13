import { InfoPage } from 'apps/FAQ';
import { identityRoutes } from 'apps/identity';
import { Page404 } from 'apps/layout';
import { MerchantGuard, OwnerRoute } from 'apps/merchant';
import { Metrics } from 'apps/metrics';
import { Settings } from 'apps/settings';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { forDevsRoutes } from '../../forDevelopers';
import { VerificationFlows } from '../../product/containers/Product/VerificationFlows';
import { Product } from '../../product';
import { Routes } from '../../../models/Router.model';

export function DashboardRouter() {
  return (
    <Switch>
      <Redirect exact from={Routes.root} to={Routes.analytics.root} />
      <OwnerRoute path={Routes.settings.root} component={Settings} />
      <Route path={Routes.info.root} component={InfoPage} />
      <MerchantGuard>
        {identityRoutes}
        {forDevsRoutes}
        <OwnerRoute path={Routes.analytics.root} component={Metrics} />
        <OwnerRoute exact path={Routes.flows.root} component={VerificationFlows} />
        <OwnerRoute path={Routes.flows.details} component={Product} />
        <Route path="*" component={Page404} />
      </MerchantGuard>
    </Switch>
  );
}
