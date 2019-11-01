import { AppBar, Toolbar } from '@material-ui/core';
import { IntlButton } from 'apps/intl';
import useMerchantBilling from 'hooks/useMerchantBilling';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsOwner } from 'state/merchant/merchant.selectors';
import AlertBanner from './alert-banner';
import PrimaryMenu from './PrimaryMenu';
import SecondaryMenu from './SecondaryMenu';
import useStyles from './styles';

export function MenuBar() {
  const classes = useStyles();
  const [isOwner] = useSelector(selectIsOwner);
  const { isPlanActivated } = useMerchantBilling();

  const ApplicationMenu = ({ children }) => (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Toolbar className={classes.toolBar}>
        {children}
      </Toolbar>
      {!isPlanActivated && <AlertBanner />}
    </AppBar>
  );

  return (
    <ApplicationMenu>
      <PrimaryMenu isOwner={isOwner} />
      <div className={classes.grow} />
      {isOwner && <SecondaryMenu key="secondary" />}
      <IntlButton key="lang" />
    </ApplicationMenu>
  );
}
