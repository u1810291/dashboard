import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  originalVerificationButton: {
    borderColor: theme.palette.common.black75,
    border: '1px solid',
    boxShadow: 'none',
    [theme.breakpoints.down(1120)]: {
      overflow: 'visible',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));
