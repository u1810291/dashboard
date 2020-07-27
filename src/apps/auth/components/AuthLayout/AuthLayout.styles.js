import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
  appBar: {
    borderBottom: [[1, 'solid', '#f0f0f0']],
    marginBottom: 50,
  },
  toolBar: {
    height: 50,
    backgroundColor: theme.palette.common.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
