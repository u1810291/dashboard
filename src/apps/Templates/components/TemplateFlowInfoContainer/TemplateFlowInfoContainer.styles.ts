import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
  },
  modal: {
    [theme.breakpoints.up('lg')]: {
      width: 725,
    },
  },
  button: {
    position: 'absolute',
    right: 0,
    top: 0,
    fontSize: 17,
  },
  link: {
    flexShrink: 0,
    margin: '3px 5px 0 0',
    fontSize: 26,
    color: theme.palette.common.lightblue,
  },
}));
