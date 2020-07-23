import { identityRoutes } from 'apps/identity';
import { InfoPage } from 'apps/info';
import { Page404 } from 'apps/layout';
import { MerchantGuard, OwnerRoute } from 'apps/merchant';
import { Metrics } from 'apps/metrics';
import { Product } from 'apps/product';
import { Settings } from 'apps/settings';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

export function DashboardRouter() {
  return (
    <Switch>
      <OwnerRoute path="/settings" component={Settings} />
      <Route path="/info" component={InfoPage} />
      <MerchantGuard>
        {identityRoutes}
        <OwnerRoute path="/metrics" component={Metrics} />
        <OwnerRoute exact path="/" component={Product} />
        <Route path="*" component={Page404} />
      </MerchantGuard>
    </Switch>
  );
}
