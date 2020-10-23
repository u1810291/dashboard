import { InfoPage } from 'apps/FAQ';
import { identityRoutes } from 'apps/identity';
import { Page404 } from 'apps/layout';
import { MerchantGuard, OwnerRoute } from 'apps/merchant';
import { Metrics } from 'apps/metrics';
import { Product } from 'apps/product';
import { Settings } from 'apps/settings';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { forDevsRoutes } from '../../forDevelopers';

export function DashboardRouter() {
  return (
    <Switch>
      <OwnerRoute path="/settings" component={Settings} />
      <Route path="/info" component={InfoPage} />
      <MerchantGuard>
        {identityRoutes}
        {forDevsRoutes}
        <OwnerRoute path="/metrics" component={Metrics} />
        <OwnerRoute exact path="/" component={Product} />
        <Route path="*" component={Page404} />
      </MerchantGuard>
    </Switch>
  );
}
