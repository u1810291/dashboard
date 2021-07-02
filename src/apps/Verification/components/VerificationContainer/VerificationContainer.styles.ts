import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      height: '100%',
    },
  },
  wrapper: {
    [theme.breakpoints.up('lg')]: {
      height: '100%',
      borderRight: `1px solid ${theme.palette.common.black7}`,
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
}));
