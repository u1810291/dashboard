import { RedirectWithLocation } from 'apps/routing';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useLocation } from 'react-router-dom';
import { selectIsOwnerModel } from 'state/merchant/merchant.selectors';
import { Routes } from '../../../models/Router.model';

export function OwnerRoute({ path, ...props }) {
  const ownerModel = useSelector(selectIsOwnerModel);
  const location = useLocation();

  const isRequestedPath = location.pathname === path;

  if (!ownerModel.isLoaded) {
    return null;
  }

  if (isRequestedPath && !ownerModel.value) {
    return <RedirectWithLocation pathname={Routes.list.root} />;
  }

  return (
    <Route path={path} {...props} />
  );
}
