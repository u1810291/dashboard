import { AppBar, Container, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { ReactComponent as MatiLogo } from 'assets/mati-logo-v2.svg';
import React from 'react';
import { Helmet } from 'react-helmet';
import { AuthTheme } from './Auth.theme';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
    height: '100%',
  },
  matilogo: {
    width: 70,
    height: 24,
  },
}));

const AuthLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet>
        <title>Mati Dashboard</title>
      </Helmet>
      <ThemeProvider theme={AuthTheme}>
        <AppBar position="static" elevation={0}>
          <Toolbar variant="dense">
            <MatiLogo className={classes.matilogo} />
          </Toolbar>
        </AppBar>
        <Container maxWidth="xs">{children}</Container>
      </ThemeProvider>
    </div>
  );
};

export default AuthLayout;
