import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  status: {
    fontWeight: 'bold',
  },
  link: {
    textDecoration: 'underline',
    color: theme.palette.common.black75,
  },
}));
