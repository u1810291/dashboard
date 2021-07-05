import { RedirectWithLocation } from 'apps/routing';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Routes } from 'models/Router.model';
import { selectAuthToken } from '../state/auth.selectors';

export function PrivateRoute({ ...props }) {
  const token = useSelector(selectAuthToken);

  if (!token) {
    return <RedirectWithLocation pathname={Routes.auth.signIn} />;
  }

  return (
    <Route {...props} />
  );
}
