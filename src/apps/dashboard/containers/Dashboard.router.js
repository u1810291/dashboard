import { identityRoutes } from 'apps/identity';
import { InfoPage } from 'apps/FAQ';
import { Page404 } from 'apps/layout';
import { MerchantGuard, OwnerRoute } from 'apps/merchant';
import { Metrics } from 'apps/metrics';
import { Settings } from 'apps/settings';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { VerificationFlows } from '../../product/containers/Product/VerificationFlows';
import { Product } from '../../product';

export function DashboardRouter() {
  return (
    <Switch>
      <OwnerRoute path="/settings" component={Settings} />
      <Route path="/info" component={InfoPage} />
      <MerchantGuard>
        {identityRoutes}
        <OwnerRoute path="/metrics" component={Metrics} />
        <OwnerRoute exact path="/" component={VerificationFlows} />
        <OwnerRoute path="/flows/:id" component={Product} />
        <Route path="*" component={Page404} />
      </MerchantGuard>
    </Switch>
  );
}
