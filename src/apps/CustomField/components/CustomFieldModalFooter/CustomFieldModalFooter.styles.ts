import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '22px',
  },
  button: {
    width: '100%',

    '&:disabled': {
      backgroundColor: theme.palette.common.lightblue,
      color: theme.palette.common.white,
      opacity: '.5',
    },
  },
}));
