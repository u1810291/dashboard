import { BlockedSplash } from 'apps/blocked';
import { ContainerLoader } from 'components/contrainer-loader';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { selectIsBlockedModel } from 'state/merchant/merchant.selectors';

export function BlockedRoute({ ...props }) {
  const blockedModel = useSelector(selectIsBlockedModel);

  if (!blockedModel.isLoaded) {
    return <ContainerLoader />;
  }

  if (blockedModel.value) {
    return <BlockedSplash />;
  }

  return <Route {...props} />;
}
