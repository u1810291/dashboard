import { createMuiTheme } from '@material-ui/core';

export const appPalette = {
  blue: '#3757ff',
  white: '#ffffff',
  red: '#fe7581',
  lightgray: '#dcdcdc',
  orange: '#f2994a',
  green: '#5ac794',
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
  shadows: [
    'none',
    '0px 2px 4px rgba(52,73,94,0.1)',
    '0px 2px 4px rgba(52,73,94,0.1)',
    '0px 2px 4px rgba(52,73,94,0.1)',
    '0px 2px 4px rgba(52,73,94,0.1)',
    '0px 6px 6px -1px rgba(0, 0, 0, 0.3),0px -1px 10px 0px rgba(0, 0, 0, 0.06),0px 1px 14px 0px rgba(0, 0, 0, 0.04)',
    '0px 6px 6px -1px rgba(0, 0, 0, 0.3),0px -2px 12px 0px rgba(0, 0, 0, 0.06),0px 1px 18px 0px rgba(0, 0, 0, 0.04)',
    '0px 7px 6px -2px rgba(0, 0, 0, 0.3),0px -1px 12px 1px rgba(0, 0, 0, 0.06),0px 2px 16px 1px rgba(0, 0, 0, 0.04)',
    '0px 10px 6px -3px rgba(0, 0, 0, 0.3),0px 0px 12px 1px rgba(0, 0, 0, 0.06),0px 3px 14px 2px rgba(0, 0, 0, 0.04)',
    '0px 10px 7px -3px rgba(0, 0, 0, 0.3),0px 1px 14px 1px rgba(0, 0, 0, 0.06),0px 3px 16px 2px rgba(0, 0, 0, 0.04)',
    '0px 11px 7px -3px rgba(0, 0, 0, 0.3),0px 2px 16px 1px rgba(0, 0, 0, 0.06),0px 4px 18px 3px rgba(0, 0, 0, 0.04)',
    '0px 11px 8px -4px rgba(0, 0, 0, 0.3),0px 3px 17px 1px rgba(0, 0, 0, 0.06),0px 4px 20px 3px rgba(0, 0, 0, 0.04)',
    '0px 13px 9px -4px rgba(0, 0, 0, 0.3),0px 4px 19px 2px rgba(0, 0, 0, 0.06),0px 5px 22px 4px rgba(0, 0, 0, 0.04)',
    '0px 13px 9px -4px rgba(0, 0, 0, 0.3),0px 5px 21px 2px rgba(0, 0, 0, 0.06),0px 5px 24px 4px rgba(0, 0, 0, 0.04)',
    '0px 13px 10px -4px rgba(0, 0, 0, 0.3),0px 6px 23px 2px rgba(0, 0, 0, 0.06),0px 5px 26px 4px rgba(0, 0, 0, 0.04)',
    '0px 15px 10px -5px rgba(0, 0, 0, 0.3),0px 7px 24px 2px rgba(0, 0, 0, 0.06),0px 6px 28px 5px rgba(0, 0, 0, 0.04)',
    '0px 15px 12px -5px rgba(0, 0, 0, 0.3),0px 8px 26px 2px rgba(0, 0, 0, 0.06),0px 6px 30px 5px rgba(0, 0, 0, 0.04)',
    '0px 15px 13px -5px rgba(0, 0, 0, 0.3),0px 9px 28px 2px rgba(0, 0, 0, 0.06),0px 6px 32px 5px rgba(0, 0, 0, 0.04)',
    '0px 17px 13px -5px rgba(0, 0, 0, 0.3),0px 10px 30px 2px rgba(0, 0, 0, 0.06),0px 7px 34px 6px rgba(0, 0, 0, 0.04)',
    '0px 17px 14px -6px rgba(0, 0, 0, 0.3),0px 11px 31px 2px rgba(0, 0, 0, 0.06),0px 7px 36px 6px rgba(0, 0, 0, 0.04)',
    '0px 19px 15px -6px rgba(0, 0, 0, 0.3),0px 12px 33px 3px rgba(0, 0, 0, 0.06),0px 8px 38px 7px rgba(0, 0, 0, 0.04)',
    '0px 19px 15px -6px rgba(0, 0, 0, 0.3),0px 13px 35px 3px rgba(0, 0, 0, 0.06),0px 8px 40px 7px rgba(0, 0, 0, 0.04)',
    '0px 19px 16px -6px rgba(0, 0, 0, 0.3),0px 14px 37px 3px rgba(0, 0, 0, 0.06),0px 8px 42px 7px rgba(0, 0, 0, 0.04)',
    '0px 20px 16px -7px rgba(0, 0, 0, 0.3),0px 15px 38px 3px rgba(0, 0, 0, 0.06),0px 9px 44px 8px rgba(0, 0, 0, 0.04)',
    '0px 20px 18px -7px rgba(0, 0, 0, 0.3),0px 16px 40px 3px rgba(0, 0, 0, 0.06),0px 9px 46px 8px rgba(0, 0, 0, 0.04)',
  ],
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: '0px 1px 5px rgba(52, 73, 94, 0.2)',
      },
    },
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
