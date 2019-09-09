import React from 'react'
import { Helmet } from 'react-helmet'
import { AppBar, Toolbar, Container } from '@material-ui/core'

import { ReactComponent as MatiLogo } from 'assets/mati-logo-v2.svg'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
    height: '100%'
  },
  matilogo: {
    width: 70,
    height: 24
  }
}))

const theme = createMuiTheme({
  typography: {
    fontSize: 16,
    htmlFontSize: 16
  },
  palette: {
    primary: {
      main: '#294aff'
    },
    tonalOffset: 0.05
  },
  props: {
    MuiTextField: {
      variant: 'outlined',
      fullWidth: true
    }
  },
  overrides: {
    MuiInputBase: {
      root: {
        fontSize: '1.2rem'
      }
    },
    MuiAppBar: {
      root: {
        backgroundColor: '#fff',
        borderBottom: '1px solid #f0f0f0',
        marginBottom: 50
      }
    },
    MuiToolbar: {
      root: {
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    MuiButton: {
      root: {
        fontSize: 'inherit',
        textTransform: 'none'
      },
      sizeLarge: {
        padding: '16px 24px'
      },
      contained: {
        boxShadow: 0,
        '&$focusVisible': {
          boxShadow: 0
        },
        '&:active': {
          boxShadow: 0
        }
      }
    }
  }
})

const AuthLayout = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Helmet>
        <title>Mati Dashboard</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <AppBar position="static" elevation={0}>
          <Toolbar variant="dense">
            <MatiLogo className={classes.matilogo} />
          </Toolbar>
        </AppBar>
        <Container maxWidth="xs">{children}</Container>
      </ThemeProvider>
    </div>
  )
}

export default AuthLayout
