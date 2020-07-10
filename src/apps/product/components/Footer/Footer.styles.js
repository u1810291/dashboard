import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 64,
    display: 'flex',
    padding: [[9, 0]],
    [theme.breakpoints.down('sm')]: {
      position: 'static',
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'stretch',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  companies: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  img: {
    height: '100%',
    maxHeight: 50,
    width: 'auto',
    flexGrow: 0,
  },
  label: {
    flexGrow: 1,
    fontWeight: 'bold',
    fontSize: 12,
    [theme.breakpoints.down('sm')]: {
      flexGrow: 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 10,
    },
  },
  quotes: {
    flexGrow: 1,
    display: 'flex',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: 20,
      justifyContent: 'center',
      height: 64,
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      height: 90,
    },
  },
  quote: {
    paddingLeft: 10,
    fontSize: 12,
    textAlign: 'right',
    fontStyle: 'italic',
    maxWidth: 400,
    color: grey.A700,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    marginLeft: 10,
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 10,
    color: theme.palette.foreground.main,
    borderLeft: [[1, 'solid', grey['300']]],
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      paddingLeft: 0,
      borderLeft: 'none',
      textAlign: 'right',
      marginTop: 10,
    },
  },
}));
