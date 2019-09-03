import React from 'react';
import { get } from 'lodash'; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useSelector } from 'react-redux';
import PrimaryMenu from './PrimaryMenu';
import SecondaryMenu from './SecondaryMenu';
import AlertBanner from './AlertBanner';
import { default as useStyles } from './styles'
import { default as IntlButton } from './intl-button/IntlButton';

const MenuBar = ({
  isOwner,
  isOwnerIsLoading
}) => {
  const classes = useStyles();
  const hasBillingPlan = useSelector(({ merchant: {billing}, plans }) =>
      get(billing, 'planDetails.activatedAt')
  );

  const ApplicationMenu = ({ children }) => (
    <AppBar position="sticky" elevation={0}>
      <Toolbar className={classes.toolBar}>
        {children}
      </Toolbar>
      { !hasBillingPlan && <AlertBanner />}
    </AppBar>
  )

  if (isOwnerIsLoading) return <ApplicationMenu />

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
}

export default MenuBar 