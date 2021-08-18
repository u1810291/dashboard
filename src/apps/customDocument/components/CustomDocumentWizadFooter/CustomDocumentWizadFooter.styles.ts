import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',

    '&:disabled': {
      backgroundColor: theme.palette.common.lightblue,
      color: theme.palette.common.white,
      opacity: '.5',
    },
  },
}));
