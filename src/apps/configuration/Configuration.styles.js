import { Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    padding: 16,
    display: 'flex',
  },
}));

export const ButtonMenu = withStyles(() => ({
  root: {
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: '#E3E6F7',
    },
    '&.active': {
      color: '#3757FF',
      backgroundColor: '#EBEEFF',
    },
  },
}))(Button);
