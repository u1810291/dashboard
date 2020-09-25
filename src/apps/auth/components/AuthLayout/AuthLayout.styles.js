import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
  toolBar: {
    height: 50,
    backgroundColor: theme.palette.common.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
