import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrap: {
    color: theme.palette.common.gray68,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginLeft: 10,
  },
  icon: {
    flexShrink: 0,
  },
}));
