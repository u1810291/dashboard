import { selectHasBilling } from 'apps/billing/state/billing.selectors';
import { RedirectWithLocation } from 'apps/routing/RedirectWithLocation';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useLocation } from 'react-router-dom';

/**
 * @return {null}
 */
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
