import { AppBar, Toolbar } from '@material-ui/core';
import { selectCurrentPlanId } from 'apps/billing/state/billing.selectors';
import { IntlButton } from 'apps/intl';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsOwnerModel } from 'state/merchant/merchant.selectors';
import AlertBanner from './alert-banner';
import { PrimaryMenu } from './PrimaryMenu';
import { SecondaryMenu } from './SecondaryMenu';
import useStyles from './styles';

export function MenuBar() {
  const classes = useStyles();
  const ownerModel = useSelector(selectIsOwnerModel);
  const isOwner = ownerModel.isLoaded && ownerModel.value === true;
  const currentPlanId = useSelector(selectCurrentPlanId);

  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Toolbar className={classes.toolBar}>
        <PrimaryMenu isOwner={isOwner} />
        <div className={classes.grow} />
        {isOwner && <SecondaryMenu key="secondary" />}
        <IntlButton key="lang" />
      </Toolbar>
      {!currentPlanId && <AlertBanner />}
    </AppBar>
  );
}
