import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Routes } from 'models/Router.model';

export function RedirectWithLocation({ pathname = Routes.root }) {
  const from = useLocation();
  const to = {
    pathname,
    state: { from },
  };

  if (from.pathname === pathname) {
    return null;
  }

  return <Redirect to={to} />;
}
