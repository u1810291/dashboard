import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  confirmButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.lightblue,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.lightbluehover,
    },
  },
}));
