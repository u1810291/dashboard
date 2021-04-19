import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  check: {
    width: '100%',
    height: '100%',
    border: `1px solid ${theme.palette.foreground.main}`,
    borderRadius: 5,
  },
  wrapper: {
    minHeight: 200,
    borderRadius: 5,
    backgroundColor: theme.palette.foreground.main,
  },
}));
