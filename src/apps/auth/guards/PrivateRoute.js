import { RedirectWithLocation } from 'apps/routing';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { selectAuthToken } from '../state/auth.selectors';
import { Routes } from '../../../models/Router.model';

export function PrivateRoute({ ...props }) {
  const token = useSelector(selectAuthToken);

  if (!token) {
    return <RedirectWithLocation pathname={Routes.auth.signIn} />;
  }

  return (
    <Route {...props} />
  );
}
