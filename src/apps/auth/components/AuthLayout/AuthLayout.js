import { AppBar, Box, Container, Toolbar } from '@material-ui/core';
import { ReactComponent as MatiLogo } from 'assets/mati-logo-v2.svg';
import React from 'react';
import { useStyles } from './AuthLayout.styles';

export function AuthLayout({ children }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar variant="dense">
          <MatiLogo width={70} height={24} />
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs">{children}</Container>
    </Box>
  );
}
