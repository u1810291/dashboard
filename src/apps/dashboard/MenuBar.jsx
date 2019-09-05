import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useSelector } from 'react-redux';
import PrimaryMenu from './PrimaryMenu';
import SecondaryMenu from './SecondaryMenu';
import AlertBanner from './AlertBanner';
import IntlButton from './intl-button/IntlButton';
import useStyles from './styles';

const MenuBar = ({
  isOwner,
  isOwnerIsLoading,
}) => {
  const classes = useStyles();
  const hasBillingPlan = useSelector(
    ({ merchant: { billing } }) => get(billing, 'planDetails.activatedAt'),
  );

  const ApplicationMenu = ({ children }) => (
    <AppBar position="sticky" elevation={0}>
      <Toolbar className={classes.toolBar}>
        {children}
      </Toolbar>
      { !hasBillingPlan && <AlertBanner />}
    </AppBar>
  );

  if (isOwnerIsLoading) return <ApplicationMenu />;

  return (
    <>
      <ApplicationMenu>
        <PrimaryMenu classes={classes} isOwner={isOwner} />
        <div className={classes.grow} />
        { isOwner && (
        <>
          <SecondaryMenu />
          <IntlButton />
        </>
        )}
      </ApplicationMenu>
    </>
  );
};

MenuBar.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  isOwnerIsLoading: PropTypes.bool.isRequired,
};

export default MenuBar;
