import { BlockedSplash } from 'apps/blocked';
import { ContainerLoader } from 'components/contrainer-loader/ContainerLoader';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

export function BlockedRoute({ ...props }) {
  const isBlocked = useSelector(({ merchant }) => !!merchant.blockedAt);
  const isBlockedLoading = useSelector(({ merchant }) => merchant.blockedAt === undefined);

  if (isBlockedLoading) {
    return <ContainerLoader />;
  }

  if (isBlocked) {
    return <BlockedSplash />;
  }

  return <Route {...props} />;
}
