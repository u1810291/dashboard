import { RedirectWithLocation } from 'apps/routing';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Routes } from 'models/Router.model';
import { selectUserId } from 'apps/user/state/user.selectors';

export function PrivateRoute({ ...props }) {
  const userId = useSelector(selectUserId);

  if (!userId) {
    return <RedirectWithLocation pathname={Routes.auth.signIn} />;
  }

  return (
    <Route {...props} />
  );
}
