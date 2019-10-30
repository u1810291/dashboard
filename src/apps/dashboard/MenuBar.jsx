import { AppBar, Toolbar } from '@material-ui/core';
import { IntlButton } from 'apps/intl';
import useMerchantBilling from 'hooks/useMerchantBilling';
import PropTypes from 'prop-types';
import React from 'react';
import AlertBanner from './alert-banner';
import PrimaryMenu from './PrimaryMenu';
import SecondaryMenu from './SecondaryMenu';
import useStyles from './styles';

export function MenuBar({ isOwner, isOwnerIsLoading }) {
  const classes = useStyles();
  const { isPlanActivated } = useMerchantBilling();

  const ApplicationMenu = ({ children }) => (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Toolbar className={classes.toolBar}>
        {children}
      </Toolbar>
      {!isPlanActivated && <AlertBanner />}
    </AppBar>
  );

  if (isOwnerIsLoading) {
    return <ApplicationMenu />;
  }

  return (
    <ApplicationMenu>
      <PrimaryMenu isOwner={isOwner} />
      <div className={classes.grow} />
      {isOwner && [
        <SecondaryMenu key="secondary" />,
        <IntlButton key="lang" />,
      ]}
    </ApplicationMenu>
  );
}

MenuBar.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  isOwnerIsLoading: PropTypes.bool.isRequired,
};
