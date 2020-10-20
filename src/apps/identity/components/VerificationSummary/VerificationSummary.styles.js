import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.black75,
    lineHeight: '1.1',
  },
  button: {
    '& .MuiButton-root': {
      flexShrink: 0,
      marginRight: 20,
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-end',
    },
  },
}));
