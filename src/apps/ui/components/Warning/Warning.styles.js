import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
    lineHeight: 1.25,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 'auto',
      textAlign: 'left',
    },
  },
  icon: {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 0,
    margin: [[0, 0, 10]],
    [theme.breakpoints.up('md')]: {
      margin: [[0, 10, 0, 0]],
    },
  },
  content: {
    flexGrow: 1,
    color: theme.palette.text.main,
  },
}));
