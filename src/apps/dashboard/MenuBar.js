import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PrimaryMenu from './PrimaryMenu';
import SecondaryMenu from './SecondaryMenu';
import { default as useStyles } from './styles'

// import IconButton from '@material-ui/core/IconButton';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';

// import Button from '@material-ui/core/Button';
// import Tooltip from '@material-ui/core/Tooltip';
// import Popper from '@material-ui/core/Popper';

// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import SendIcon from '@material-ui/icons/Send';

import { default as IntlButton } from './IntlButton';

const MenuBar = ({
  isOwner,
  isOwnerIsLoading
}) => {
  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);

  // function handleMenu(event) {
  //   setAnchorEl(event.currentTarget);
  // }

  // function handleClose() {
  //   setAnchorEl(null);
  // }

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