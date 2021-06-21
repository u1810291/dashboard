import React, { useState, useCallback } from 'react';
import { IconButton, DrawerProps as MaterialDrawerProps, Typography, Box } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { StyledDrawer, useStyles } from './Drawer.styles';

interface DrawerProps {
  title?: string;
  drawerProps: MaterialDrawerProps;
  children: JSX.Element;
}

const ModalProps = {
  disableBackdropClick: true,
  disableScrollLock: true,
  hideBackdrop: true,
};

export function Drawer({ title, drawerProps, children }: DrawerProps) {
  const [open, setOpen] = useState<boolean>(true);
  const classes = useStyles();

  const onClose = useCallback(
    () => {
      setOpen(false);
    },
    [],
  );
  return (
    <Box className={classes.drawer}>
      <StyledDrawer anchor="right" open={open} onClose={onClose} ModalProps={ModalProps} {...drawerProps}>
        {title && <Typography variant="subtitle1" className={classes.title}>{title}</Typography>}
        <IconButton color="primary" component="span" onClick={onClose} className={classes.closeButton}>
          <Close />
        </IconButton>
        {children}
      </StyledDrawer>
    </Box>

  );
}
