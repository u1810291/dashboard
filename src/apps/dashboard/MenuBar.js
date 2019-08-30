import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PrimaryMenu from './PrimaryMenu';
import SecondaryMenu from './SecondaryMenu';
import { default as useStyles } from './styles'

import { default as IntlButton } from './intl-button/IntlButton';

const MenuBar = ({
  isOwner,
  isOwnerIsLoading
}) => {
  const classes = useStyles();

  const ApplicationMenu = ({ children }) => (
    <AppBar position="static" elevation={0}>
      <Toolbar className={classes.toolBar}>
        {children}
      </Toolbar>
    </AppBar>
  )

  if (isOwnerIsLoading) return <ApplicationMenu />

  return (
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
  );
}

export default MenuBar 