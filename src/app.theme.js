import { createMuiTheme } from '@material-ui/core';

export const appPalette = {
  blue: '#3757ff',
  white: '#ffffff',
  red: '#ff3535',
  lightgray: '#dcdcdc',
};

export const appTypography = {
  h1: {
    fontSize: 34,
    fontWeight: 400,
  },
  h2: {
    fontSize: 28,
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  h5: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  h6: {
    fontSize: 16,
  },
  subtitle2: {
    fontWeight: 'bold',
  },
  button: {
    // remove default capitalize from buttons
    textTransform: 'none',
  },
  fontFamily: ['Lato', 'Helvetica Neue', 'sans-serif'].join(','),
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
  typography: appTypography,
});
