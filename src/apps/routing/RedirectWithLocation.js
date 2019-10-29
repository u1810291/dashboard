import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

export function RedirectWithLocation({ pathname = '/' }) {
  const from = useLocation();
  const to = {
    pathname,
    state: { from },
  };

  return (
    <Redirect to={to} />
  );
}
