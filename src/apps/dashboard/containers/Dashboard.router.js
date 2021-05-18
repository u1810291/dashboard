import { forDevsRoutes } from 'apps/forDevelopers';
import { identityRoutes } from 'apps/identity';
import { Page404, PageLoader } from 'apps/layout';
import { MerchantGuard, OwnerRoute } from 'apps/merchant';
import { Routes } from 'models/Router.model';
import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { appPalette } from 'apps/theme';

const InfoPageLazy = lazy(async () => {
  const { InfoPage } = await import('apps/FAQ');
  return { default: InfoPage };
});

const ProductLazy = lazy(async () => {
  const { Product } = await import('apps/product');
  return { default: Product };
});

const AnalyticsContainerLazy = lazy(async () => {
  const { AnalyticsContainer } = await import('apps/analytics');
  return { default: AnalyticsContainer };
});

const SettingsLazy = lazy(async () => {
  const { Settings } = await import('apps/settings');
  return { default: Settings };
});

const AgentHistoryLazy = lazy(async () => {
  const { AgentHistory } = await import('apps/agentHistory');
  return { default: AgentHistory };
});

const VerificationFlowsLazy = lazy(async () => {
  const { VerificationFlows } = await import('apps/flows');
  return { default: VerificationFlows };
});

export function DashboardRouter() {
  return (
    <Suspense fallback={<PageLoader size={50} color={appPalette.black50} />}>
      <Switch>
        <Redirect exact from={Routes.root} to={Routes.analytics.root} />
        <OwnerRoute path={Routes.settings.root} component={SettingsLazy} />
        <Route path={Routes.info.root} component={InfoPageLazy} />
        <MerchantGuard>
          {identityRoutes}
          {forDevsRoutes}
          <OwnerRoute path={Routes.analytics.root} component={AnalyticsContainerLazy} />
          <OwnerRoute exact path={Routes.flows.root} component={VerificationFlowsLazy} />
          <OwnerRoute path={Routes.flows.details} component={ProductLazy} />
          <OwnerRoute path={Routes.collaborators.agentProfile.details} component={AgentHistoryLazy} />
          <Route path="*" component={Page404} />
        </MerchantGuard>
      </Switch>
    </Suspense>
  );
}
