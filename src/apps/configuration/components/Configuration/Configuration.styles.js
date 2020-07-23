import { Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    padding: 16,
    display: 'flex',
  },
}));

export const ButtonMenu = withStyles((theme) => ({
  root: {
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    textAlign: 'left',

    '&:hover': {
      backgroundColor: '#E3E6F7',
    },
    '&.active': {
      color: theme.palette.primary.main,
      backgroundColor: '#EBEEFF',
    },
    [theme.breakpoints.down('xs')]: {
      padding: [[8, 12]],
      minWidth: 'auto',
      width: 'auto',
    },
  },
  startIcon: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}))(Button);
