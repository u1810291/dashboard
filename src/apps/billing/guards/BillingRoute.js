import { RedirectWithLocation } from 'apps/routing';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useLocation } from 'react-router-dom';
import { selectHasBilling } from '../state/billing.selectors';

export function BillingRoute({ path, ...props }) {
  const location = useLocation();
  const hasBillingModel = useSelector(selectHasBilling);
  const isRequestedPath = location.pathname === path;

  if (!hasBillingModel.isLoaded) {
    return null;
  }

  if (isRequestedPath && !hasBillingModel.value) {
    return <RedirectWithLocation pathname="/settings" />;
  }

  return (
    <Route path={path} {...props} />
  );
}
