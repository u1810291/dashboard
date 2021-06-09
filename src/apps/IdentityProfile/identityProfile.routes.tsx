import { Route } from 'react-router-dom';
import { Routes } from 'models/Router.model';
import React, { lazy } from 'react';

const IdentityProfileLazy = lazy(async () => {
  const { IdentityProfile } = await import('./components/IdentityProfile/IdentityProfile');
  return { default: IdentityProfile };
});

export const identityProfileRoutes = [
  <Route key="identity-profile" path={Routes.identity.profile.details} component={IdentityProfileLazy} />,
];
