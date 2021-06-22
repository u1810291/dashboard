import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  container: {
    position: 'relative',
    borderRadius: 10,
    backgroundColor: theme.palette.common.white,
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
    margin: '3px 5px 0 0',
    fontSize: 26,
    color: theme.palette.common.lightblue,
  },
}));
