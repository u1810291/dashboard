import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useLocation } from 'react-router-dom';
import { selectIsOwner } from 'state/merchant/merchant.selectors';
import { RedirectWithLocation } from './RedirectWithLocation';

export function OwnerRoute({ path, ...props }) {
  const isOwner = useSelector(selectIsOwner);
  const location = useLocation();

  const isRequestedPath = location.pathname === path;

  if (isRequestedPath && !isOwner) {
    return <RedirectWithLocation pathname="/identities" />;
  }

  return (
    <Route path={path} {...props} />
  );
}
