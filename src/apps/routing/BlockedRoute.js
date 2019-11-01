import { BlockedSplash } from 'apps/blocked';
import { ContainerLoader } from 'components/contrainer-loader';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { selectIsBlocked } from 'state/merchant/merchant.selectors';

export function BlockedRoute({ ...props }) {
  const [isBlocked, isLoading] = useSelector(selectIsBlocked);

  if (isLoading) {
    return <ContainerLoader />;
  }

  if (isBlocked) {
    return <BlockedSplash />;
  }

  return <Route {...props} />;
}
