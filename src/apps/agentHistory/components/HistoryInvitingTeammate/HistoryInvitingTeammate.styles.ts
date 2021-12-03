import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'underline',
    fontWeight: 'bold',
    color: theme.palette.common.black,
  },
}));
