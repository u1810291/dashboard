import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  actionsButton: {
    marginBottom: '18px',

    '&:disabled': {
      backgroundColor: theme.palette.common.lightblue,
      color: theme.palette.common.white,
      opacity: '.5',
    },
  },
}));
