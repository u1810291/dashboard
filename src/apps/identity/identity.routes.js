import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { Routes } from '../../models/Router.model';

const VerificationHistoryLazy = lazy(async () => {
  const { VerificationHistory } = await import('./containers/VerificationHistory/VerificationHistory');
  return { default: VerificationHistory };
});

const VerificationDetailLazy = lazy(async () => {
  const { VerificationDetail } = await import('./containers/VerificationDetail/VerificationDetail');
  return { default: VerificationDetail };
});

export const identityRoutes = [
  <Route key="demo" path={Routes.list.demo} component={VerificationDetailLazy} />,
  <Route key="details" path={Routes.list.details} component={VerificationDetailLazy} />,
  <Route key="list" exact path={Routes.list.root} component={VerificationHistoryLazy} />,
];
