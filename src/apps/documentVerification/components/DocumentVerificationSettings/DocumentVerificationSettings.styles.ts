import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  setting: {
    '& > div > div': {
      marginRight: 0,
    },
  },
  button: {
    minHeight: 50,
    fontSize: 14,
    fontWeight: 'bold',
    transition: '.2s all ease-in-out',
    '&.Mui-disabled': {
      opacity: 0.3,
      backgroundColor: theme.palette.common.lightblue,
      color: theme.palette.common.white,
    },
  },
  biometric: {
    transition: '.2s all ease-in-out',
  },
  disabled: {
    borderColor: 'rgba(80, 125, 237, 0.3)',
  },
}));
