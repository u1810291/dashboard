import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    background: `linear-gradient(90deg, ${theme.palette.common.black7} 18px, transparent 1%) center, linear-gradient(${theme.palette.common.black7} 18px, transparent 1%) center, ${theme.palette.common.black50}`,
    backgroundSize: '19px 19px',
    '& .MuiSwitch-root': {
      width: 30,
      height: 17,
      padding: 0,
      '& .MuiSwitch-colorPrimary': {
        padding: 1,
        color: theme.palette.common.white,
        '&.Mui-checked': {
          transform: 'translateX(13px)',
          color: theme.palette.common.white,
          '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.common.green,
            border: 'none',
          },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
          color: theme.palette.common.green,
          border: `6px solid ${theme.palette.common.white}`,
        },
        '& .MuiSwitch-thumb': {
          width: 15,
          height: 15,
        },
      },
      '& .MuiSwitch-track': {
        borderRadius: 13,
        border: `1px solid ${theme.palette.common.black50}`,
        backgroundColor: theme.palette.common.black50,
        opacity: 1,
      },
    },
  },
  wrapper: {
    height: '100%',
    minWidth: 1060,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flowInfo: {
    position: 'relative',
    borderRadius: 10,
    backgroundColor: theme.palette.common.white,
  },
  sidebar: {
    flexShrink: 0,
    flexBasis: 'auto',
    width: 345,
    [theme.breakpoints.up('xl')]: {
      width: 360,
    },
  },
  details: {
    flexShrink: 0,
    flexBasis: 'auto',
    width: 325,
    [theme.breakpoints.up('xl')]: {
      width: 340,
    },
  },
  content: {
    flexBasis: 'auto',
    width: 'calc(100% - 345px)',
    [theme.breakpoints.up('xl')]: {
      width: 'calc(100% - 360px)',
    },
  },
  graph: {
    minWidth: 330,
    height: 'calc(100vh - 200px)',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      height: 0,
      width: 0,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
  },
  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 190px)',
    padding: 40,
    '& p': {
      maxWidth: 160,
    },
  },
  buttonBack: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    color: theme.palette.common.black75,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.palette.common.lightgrayopacity,
  },
  templatesButton: {
    borderColor: theme.palette.common.lightblue,
    color: theme.palette.common.lightblue,
    minWidth: 120,
    height: 43,
    minHeight: 43,
    marginLeft: 16,
    fontSize: 14,
    fontWeight: 'bold',
  },
}));
