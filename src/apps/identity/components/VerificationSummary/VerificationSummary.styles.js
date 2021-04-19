import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.text.main,
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
  ongoingMonitoringNotification: {
    '&::after': {
      display: 'none',
    },
  },
}));
