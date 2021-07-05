import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  extendedDescription: {
    maxWidth: '300px',
    transition: '.2s all ease-in-out',
  },
  disabled: {
    opacity: 0.3,
  },
  badge: {
    padding: '3px 10px',
    color: theme.palette.common.lightblue,
    backgroundColor: theme.palette.common.whiteblue,
    borderRadius: 30,
    whiteSpace: 'nowrap',
  },
}));
