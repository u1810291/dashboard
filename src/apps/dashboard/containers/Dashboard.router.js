import { forDevsRoutes } from 'apps/forDevelopers';
import { identityRoutes } from 'apps/identity';
import { identityProfileRoutes } from 'apps/IdentityProfile';
import { Page404, PageLoader } from 'apps/layout';
import { MerchantGuard, OwnerRoute } from 'apps/merchant';
import { appPalette } from 'apps/theme';
import { Routes } from 'models/Router.model';
// import { IS_IDENTITY_PROFILE_RELEASED } from 'models/Release.model';
import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { verificationListRoutes } from 'apps/VerificationList';

const InfoPageLazy = lazy(async () => {
  const { InfoPage } = await import('apps/FAQ');
  return { default: InfoPage };
});

const ProductLazy = lazy(async () => {
  const { Product } = await import('apps/oldProduct');
  return { default: Product };
});

const FlowBuilderLazy = lazy(async () => {
  // TODO @dkchv: !!! restore render after fixes
  const { FlowBuilder } = await import('apps/flowBuilder');
  return { default: FlowBuilder };
});

const AnalyticsContainerLazy = lazy(async () => {
  const { AnalyticsContainer } = await import('apps/Analytics');
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

const FlowListLazy = lazy(async () => {
  const { FlowList } = await import('apps/FlowList');
  return { default: FlowList };
});

export function DashboardRouter() {
  return (
    <Suspense fallback={<PageLoader size={50} color={appPalette.black50} />}>
      <Switch>
        <Redirect exact from={Routes.root} to={Routes.analytics.root} />
        {/* TODO: @vladislav.snimshchikov delete redirect when /verification will be done */}
        {/* {!IS_IDENTITY_PROFILE_RELEASED && (
          <Redirect exact from={Routes.identity.verification.root} to={Routes.list.root} />
        )} */}
        <OwnerRoute path={Routes.settings.root} component={SettingsLazy} />
        <Route path={Routes.info.root} component={InfoPageLazy} />
        <MerchantGuard>
          {identityRoutes}
          {forDevsRoutes}
          {identityProfileRoutes}
          {verificationListRoutes}
          <OwnerRoute path={Routes.analytics.root} component={AnalyticsContainerLazy} />
          <OwnerRoute path={Routes.flows.details} component={ProductLazy} />
          <OwnerRoute exact path={Routes.flow.root} component={FlowListLazy} />
          <OwnerRoute path={Routes.flow.details} component={FlowBuilderLazy} />
          <OwnerRoute path={Routes.collaborators.agentProfile.details} component={AgentHistoryLazy} />
          <Route path="*" component={Page404} />
        </MerchantGuard>
      </Switch>
    </Suspense>
  );
}
