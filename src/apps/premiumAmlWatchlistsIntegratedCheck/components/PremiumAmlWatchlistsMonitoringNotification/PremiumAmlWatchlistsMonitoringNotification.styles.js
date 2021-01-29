import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  notificationText: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: '-25px',
  },
  notificationIcon: {
    width: '25px',
    flex: '0 0 25px',
  },
  notificationButton: {
    textDecoration: 'underline',
  },
  redText: {
    color: theme.palette.common.red,
  },
  greenText: {
    color: theme.palette.common.green,
  },
}));
