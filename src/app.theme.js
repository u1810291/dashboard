import { createMuiTheme } from '@material-ui/core';

export const AppTheme = createMuiTheme({
  spacing: 10,
  palette: {
    primary: {
      main: '#3757ff',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#3757ff',
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'inherit !important',
        },
      },
    },
  },
  typography: {
    h1: {
      fontSize: '28px',
    },
    h2: {
      fontSize: '18px',
    },
    h3: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
    fontFamily: ['Lato', 'Helvetica Neue', 'sans-serif'].join(','),
  },
});
