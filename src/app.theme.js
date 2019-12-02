import { createMuiTheme } from '@material-ui/core';

export const appPalette = {
  blue: '#3757ff',
  white: '#ffffff',
  red: '#ff3535',
  lightgray: '#dcdcdc',
};

export const AppTheme = createMuiTheme({
  spacing: 10,
  palette: {
    primary: {
      main: appPalette.blue,
      contrastText: appPalette.white,
    },
    secondary: {
      main: appPalette.white,
      contrastText: appPalette.blue,
    },
    background: {
      default: appPalette.white,
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'inherit !important',
        },
      },
      sizeSmall: {
        fontSize: '1rem',
      },
    },
    MuiButton: {
      startIcon: {
        width: '1rem',
      },
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
    subtitle2: {
      fontWeight: 'bold',
    },
    button: {
      // remove default capitalize from buttons
      textTransform: 'none',
    },
    fontFamily: ['Lato', 'Helvetica Neue', 'sans-serif'].join(','),
  },
});
