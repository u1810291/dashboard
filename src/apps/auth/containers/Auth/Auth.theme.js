import { createMuiTheme } from '@material-ui/core';
import { appPalette, appTypography } from 'app.theme';

export const AuthTheme = createMuiTheme({
  typography: {
    fontSize: 16,
    htmlFontSize: 16,
    ...appTypography,
  },
  palette: {
    primary: {
      main: '#294aff',
      contrastText: appPalette.white,
    },
    background: {
      default: appPalette.white,
    },
    tonalOffset: 0.05,
  },
  props: {
    MuiTextField: {
      variant: 'outlined',
      fullWidth: true,
    },
  },
  overrides: {
    MuiInputBase: {
      root: {
        fontSize: '1.2rem',
      },
    },
    MuiAppBar: {
      root: {
        backgroundColor: '#fff',
        borderBottom: '1px solid #f0f0f0',
        marginBottom: 50,
      },
    },
    MuiToolbar: {
      root: {
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    MuiButton: {
      root: {
        fontSize: 'inherit',
        textTransform: 'none',
      },
      sizeLarge: {
        padding: '16px 24px',
      },
      contained: {
        boxShadow: 0,
        '&$focusVisible': {
          boxShadow: 0,
        },
        '&:active': {
          boxShadow: 0,
        },
      },
    },
  },
});