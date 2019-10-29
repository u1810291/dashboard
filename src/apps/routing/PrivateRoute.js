import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { RedirectWithLocation } from './RedirectWithLocation';

export function PrivateRoute({ ...props }) {
  const isLoggedIn = useSelector((state) => !!state.auth.token);

  if (!isLoggedIn) {
    return <RedirectWithLocation pathname="/auth/signin" />;
  }

  return (
    <Route {...props} />
  );
}
