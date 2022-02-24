import React, { lazy } from 'react';
import { RoleGuardRoute } from 'apps/routing';
import { WithAgent } from 'models/Collaborator.model';
import { Routes } from 'models/Router.model';

const VerificationHistoryLazy = lazy(async () => {
  const { VerificationHistory } = await import('apps/verificationHistory');
  return { default: VerificationHistory };
});

export const identityProfileRoutes = [
  <RoleGuardRoute roles={WithAgent} key="verification-history" path={Routes.list.history.details} component={VerificationHistoryLazy} />,
];
