import { Box } from '@material-ui/core';
import { IntlButton } from 'apps/intl';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsOwnerModel } from 'state/merchant/merchant.selectors';
import { selectReviewCounterModel } from 'state/identities/identities.selectors';
import { PrimaryMenu } from '../PrimaryMenu/PrimaryMenu';
import { SecondaryMenu } from '../SecondaryMenu/SecondaryMenu';

export function DashboardMenu() {
  const ownerModel = useSelector(selectIsOwnerModel);
  const reviewCount = useSelector(selectReviewCounterModel);
  const isOwner = ownerModel.isLoaded && ownerModel.value === true;

  return [
    <PrimaryMenu key="primary" isOwner={isOwner} reviewCount={reviewCount} />,
    <Box key="divider" flexGrow={1} />,
    isOwner && <SecondaryMenu key="secondary" />,
    <IntlButton key="lang" />,
  ];
}
