import { createMuiTheme } from '@material-ui/core';
import { appTypography } from 'apps/theme/app.typography';
import { appDarkPalette } from './appDark.palette';

export const AppDarkTheme = createMuiTheme({
  isDarkMode: true,
  palette: {
    primary: {
      main: appDarkPalette.blue,
      contrastText: appDarkPalette.white,
    },
    secondary: {
      main: appDarkPalette.white,
      contrastText: appDarkPalette.blue,
    },
    foreground: {
      main: appDarkPalette.black7opacity,
    },
    background: {
      default: appDarkPalette.black90,
      loader: appDarkPalette.black90opacity,
    },
    text: {
      main: appDarkPalette.black50,
      secondary: appDarkPalette.black7,
    },
    success: {
      main: appDarkPalette.green,
    },
    warning: {
      main: appDarkPalette.yellow,
    },
    error: {
      main: appDarkPalette.red,
    },
    button: {
      document: {
        main: appDarkPalette.lightblue,
        contrastText: appDarkPalette.black50,
      },
    },
    common: appDarkPalette,
  },
  spacing: 10,
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
        border: '1px solid rgba(237, 240, 245, .15)',
        filter: 'drop-shadow(0px 1px 4px rgba(52, 73, 94, 0.1))',
        backgroundColor: appDarkPalette.black90,
      },
      rounded: {
        borderRadius: 5,
      },
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'inherit',
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
    MuiOutlinedInput: {
      root: {
        '& input': {
          padding: '17px 14px',
          backgroundColor: appDarkPalette.white,
        },
        '& $notchedOutline': {
          borderColor: appDarkPalette.black75,
        },
        '&:hover $notchedOutline': {
          borderColor: appDarkPalette.lightblue,
          borderWidth: 1,
        },
        '&$focused $notchedOutline': {
          borderColor: appDarkPalette.lightblue,
          borderWidth: 1,
        },
      },
    },
    MuiFormHelperText: {
      root: {
        color: appDarkPalette.black75,
      },
      contained: {
        marginLeft: 0,
        fontSize: 14,
        lineHeight: 1.2,
      },
    },
    MuiFormControl: {
      marginDense: {
        marginBottom: 0,
      },
    },
    MuiContainer: {
      root: {
        '@media (min-width: 600px)': {
          paddingLeft: 40,
          paddingRight: 40,
        },
      },
    },
  },
  typography: appTypography,
});
