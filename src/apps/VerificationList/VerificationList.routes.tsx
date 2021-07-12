import { Route } from 'react-router-dom';
import { Routes } from 'models/Router.model';
import React, { lazy } from 'react';

const VerificationListLazy = lazy(async () => {
  const { VerificationList } = await import('./components/VerificationList/VerificationList');
  return { default: VerificationList };
});

export const verificationListRoutes = [
  <Route key="verification-list" exact path={Routes.identity.verification.root} component={VerificationListLazy} />,
];
