import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  status: {
    [theme.breakpoints.up('xl')]: {
      flexBasis: 'calc(66.66% - 30px)',
      maxWidth: 'calc(66.66% - 30px)',
    },
  },
}));
