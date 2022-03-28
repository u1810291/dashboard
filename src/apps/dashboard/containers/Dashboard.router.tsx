import { forDevsRoutes } from 'apps/forDevelopers';
import { identityProfileOldRoutes } from 'apps/IdentityProfileOld';
import { Page404, PageLoader } from 'apps/layout';
import { MerchantGuard } from 'apps/merchant';
import { appPalette } from 'apps/theme';
import { Routes } from 'models/Router.model';
import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { verificationListRoutes } from 'apps/VerificationList';
import { WithAuditor, CollaboratorRoles } from 'models/Collaborator.model';
import { RoleGuardRoute } from 'apps/routing';
import { RoleRoutingGuard } from 'apps/merchant/guards/RoleRoutingGuard';

const InfoPageLazy = lazy(async () => {
  const { InfoPage } = await import('apps/FAQ');
  return { default: InfoPage };
});

const FlowBuilderLazy = lazy(async () => {
  // TODO @dkchv: !!! restore render after fixes
  const { FlowBuilder } = await import('apps/flowBuilder');
  return { default: FlowBuilder };
});

const IdentityProfileOldLazy = lazy(async () => {
  const { IdentityProfileOld } = await import('apps/IdentityProfileOld');
  return { default: IdentityProfileOld };
});

const VerificationContainerLazy = lazy(async () => {
  const { VerificationContainer } = await import('pages/Verification');
  return { default: VerificationContainer };
});

const IdentityProfileLazy = lazy(async () => {
  const { IdentityProfile } = await import('pages/IdentityProfile');
  return { default: IdentityProfile };
});

const WorkFlowBuilderLazy = lazy(async () => {
  const { WorkflowBuilder } = await import('pages/WorkflowBuilder');
  return { default: WorkflowBuilder };
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

const WorkflowListLazy = lazy(async () => {
  const { WorkflowListPage } = await import('pages/WorkflowList');
  return { default: WorkflowListPage };
});

const ProductBoardLazy = lazy(async () => {
  const { ProductBoard } = await import('apps/ProductBoard');
  return { default: ProductBoard };
});

export function DashboardRouter() {
  return (
    <Suspense fallback={<PageLoader size={50} color={appPalette.black50} />}>
      <Switch>
        <Redirect exact from={Routes.root} to={Routes.analytics.root} />
        <RoleGuardRoute roles={WithAuditor} path={Routes.settings.root} component={SettingsLazy} />
        <Route path={Routes.info.root} component={InfoPageLazy} />
        <MerchantGuard>
          <Route path={Routes.identity.profile.details.root} component={IdentityProfileOldLazy} />
          <Route
            path={Routes.identityProfile.details.root}
            render={() => (
              <IdentityProfileLazy>
                <Route path={Routes.identityProfile.details.verificationDetails}>
                  <VerificationContainerLazy />
                </Route>
              </IdentityProfileLazy>
            )}
          />
          {identityProfileOldRoutes}
          {verificationListRoutes}
          {forDevsRoutes}
          {/* TODO: @ggrigorev refactor Dashboard router. All of the problems are because of the Switch. It supports only <Route/> tags as children */}
          {/* @ts-ignore */}
          <RoleRoutingGuard roles={[CollaboratorRoles.ADMIN]}>
            <Route path={Routes.analytics.root} component={AnalyticsContainerLazy} />
            <Route exact path={Routes.flow.root} component={FlowListLazy} />
            <Route exact path={Routes.workflow.root} component={WorkflowListLazy} />
            <Route path={Routes.flow.details} component={FlowBuilderLazy} />
            <Route path={Routes.workflow.details} component={WorkFlowBuilderLazy} />
            <Route path={Routes.collaborators.agentProfile.details} component={AgentHistoryLazy} />
            <Route path={Routes.productBoard.root} component={ProductBoardLazy} />
          </RoleRoutingGuard>
          <Route path="*" component={Page404} />
        </MerchantGuard>
      </Switch>
    </Suspense>
  );
}
