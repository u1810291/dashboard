import { createMuiTheme } from '@material-ui/core';

export const appPalette = {
  blue: '#3757ff',
  white: '#ffffff',
  red: '#ff3535',
  lightgray: '#dcdcdc',
  orange: '#f2994a',
  green: '#00ab62',
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
    success: {
      main: appPalette.green,
    },
    warning: {
      main: appPalette.orange,
    },
    error: {
      main: appPalette.red,
    },
    common: appPalette,
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
    MuiTableCell: {
      root: {
        fontSize: 14,
      },
      head: {
        fontWeight: 'bold',
      },
    },
  },
  typography: appTypography,
});
