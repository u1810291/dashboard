import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  buttonEdit: {
    minWidth: 95,
    minHeight: 43,
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 'bold',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.lightbluehover,
    },
    '&:disabled': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.common.lightblue,
      opacity: 0.5,
    },
  },
  issues: {
    color: theme.palette.common.red,
  },
}));
