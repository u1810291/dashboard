import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  remove: {
    color: theme.palette.common.red,
    cursor: 'pointer',
  },
  disabledRemove: {
    cursor: 'not-allowed',
  },
}));
