import { BlockedSplash } from 'apps/blocked';
import { PageLoader } from 'apps/layout';
import React from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { selectIsBlockedModel } from 'state/merchant/merchant.selectors';

export function MerchantGuard({ children }) {
  const blockedModel = useSelector(selectIsBlockedModel);

  if (!blockedModel.isLoaded) {
    return <PageLoader />;
  }

  // if (blockedModel.value) {
  //   return <BlockedSplash />;
  // }

  return (
    <Switch>
      {children}
    </Switch>
  );
}
