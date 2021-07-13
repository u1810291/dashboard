import React, { lazy } from 'react';
import { OwnerRoute } from 'apps/merchant';
import { Route } from 'react-router-dom';
import { Routes } from 'models/Router.model';

const VerificationListLazy = lazy(async () => {
  const { VerificationList } = await import('./containers/VerificationList/VerificationList');
  return { default: VerificationList };
});

const VerificationDetailLazy = lazy(async () => {
  const { VerificationDetail } = await import('./containers/VerificationDetail/VerificationDetail');
  return { default: VerificationDetail };
});

const VerificationHistoryLazy = lazy(async () => {
  const { VerificationHistory } = await import('apps/verificationHistory');
  return { default: VerificationHistory };
});

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 */
export const identityRoutes = [
  <Route key="demo" path={Routes.list.demo} component={VerificationDetailLazy} />,
  <OwnerRoute key="verification-history" path={Routes.list.history.details} component={VerificationHistoryLazy} />,
  <Route key="details" path={Routes.list.details} component={VerificationDetailLazy} />,
  <Route key="list" exact path={Routes.list.root} component={VerificationListLazy} />,
];
