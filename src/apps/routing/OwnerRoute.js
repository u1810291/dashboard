import { RedirectWithLocation } from 'apps/routing/RedirectWithLocation';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useLocation } from 'react-router-dom';
import { selectIsOwner } from 'state/merchant/merchant.selectors';

/**
 * @return {null}
 */
export function OwnerRoute({ path, ...props }) {
  const [isOwner, isLoading] = useSelector(selectIsOwner);
  const location = useLocation();

  const isRequestedPath = location.pathname === path;

  if (isLoading) {
    return null;
  }

  if (isRequestedPath && !isOwner) {
    return <RedirectWithLocation pathname="/identities" />;
  }

  if (isLoading) {
    return null;
  }

  return (
    <Route path={path} {...props} />
  );
}
