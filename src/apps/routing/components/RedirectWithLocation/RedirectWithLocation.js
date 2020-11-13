import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Routes } from '../../../../models/Router.model';

export function RedirectWithLocation({ pathname = Routes.root }) {
  const from = useLocation();
  const to = {
    pathname,
    state: { from },
  };

  return from.pathname !== pathname && <Redirect to={to} />;
}
