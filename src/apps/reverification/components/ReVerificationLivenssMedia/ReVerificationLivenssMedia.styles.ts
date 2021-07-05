import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 14,
    color: theme.palette.text.main,
  },
  mediaItem: {
    margin: '0 20px 0 0',
    minWidth: 140,
    maxWidth: 140,
  },
}));
