import React, { lazy } from 'react';
import { RoleGuardRoute } from 'apps/routing';
import { WithAgent } from 'models/Collaborator.model';
import { Route } from 'react-router-dom';
import { Routes } from 'models/Router.model';

const IdentityProfileLazy = lazy(async () => {
  const { IdentityProfile } = await import('./components/IdentityProfile/IdentityProfile');
  return { default: IdentityProfile };
});

const VerificationHistoryLazy = lazy(async () => {
  const { VerificationHistory } = await import('apps/verificationHistory');
  return { default: VerificationHistory };
});

export const identityProfileRoutes = [
  <Route key="identity-profile" path={Routes.identity.profile.details.root} component={IdentityProfileLazy} />,
  <RoleGuardRoute roles={WithAgent} key="verification-history" path={Routes.list.history.details} component={VerificationHistoryLazy} />,
];
