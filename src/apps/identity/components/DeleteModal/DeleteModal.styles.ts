import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  deleteButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.red,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.redhover,
    },
  },
}));
