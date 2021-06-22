import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    background: `linear-gradient(90deg, ${theme.palette.common.black7} 18px, transparent 1%) center, linear-gradient(${theme.palette.common.black7} 18px, transparent 1%) center, ${theme.palette.common.black50}`,
    backgroundSize: '19px 19px',
  },
  wrapper: {
    height: '100%',
  },
  sidebar: {
    [theme.breakpoints.up('lg')]: {
      flexBasis: 'auto',
      width: 340,
    },
    [theme.breakpoints.up('xl')]: {
      width: 360,
    },
  },
  content: {
    [theme.breakpoints.up('lg')]: {
      flexBasis: 'auto',
      width: 'calc(100% - 680px)',
    },
    [theme.breakpoints.up('xl')]: {
      width: 'calc(100% - 720px)',
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
  buttonSave: {
    minWidth: 220,
    minHeight: 50,
    fontSize: 14,
    fontWeight: 'bold',
    '& svg': {
      marginRight: 5,
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
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
  },
}));
