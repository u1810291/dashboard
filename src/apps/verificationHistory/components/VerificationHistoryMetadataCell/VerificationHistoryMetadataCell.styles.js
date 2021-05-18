import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  avatarWrapper: {
    [theme.breakpoints.down('md')]: {
      flexWrap: 'nowrap',
    },
  },
}));
