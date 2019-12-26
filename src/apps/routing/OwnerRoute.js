import { RedirectWithLocation } from 'apps/routing/RedirectWithLocation';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useLocation } from 'react-router-dom';
import { selectIsOwnerModel } from 'state/merchant/merchant.selectors';

/**
 * @return {null}
 */
export function OwnerRoute({ path, ...props }) {
  const ownerModel = useSelector(selectIsOwnerModel);
  const location = useLocation();

  const isRequestedPath = location.pathname === path;

  if (!ownerModel.isLoaded) {
    return null;
  }

  if (isRequestedPath && !ownerModel.value) {
    return <RedirectWithLocation pathname="/identities" />;
  }

  return (
    <Route path={path} {...props} />
  );
}
