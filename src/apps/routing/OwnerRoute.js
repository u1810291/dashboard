import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { RedirectWithLocation } from './RedirectWithLocation';

export function OwnerRoute({ ...props }) {
  const isOwner = useSelector((state) => (
    !state.merchant.collaborators || !state.merchant.collaborators.find(
      (col) => col.user === state.auth.user.id && col.role === 2,
    )
  ));

  if (!isOwner) {
    return <RedirectWithLocation pathname="/identities" />;
  }

  return (
    <Route {...props} />
  );
}
