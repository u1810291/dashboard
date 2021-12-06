import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.common.black,
  },
  contrastLink: {
    textDecoration: 'underline',
    color: theme.palette.common.lightblue,
  },
}));
