import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.text.main,
    lineHeight: '1.1',
  },
  titleError: {
    color: theme.palette.common.red,
    lineHeight: '1.1',
  },
  titleIcon: {
    flexShrink: 0,
    marginRight: 10,
    color: theme.palette.common.green,
  },
  map: {
    height: 200,
    borderRadius: 5,
    '&>img': {
      width: '100%',
      height: '100%',
      borderRadius: 5,
      objectFit: 'cover',
    },
  },
  error: {
    width: '100%',
    background: theme.palette.common.redopacity,
    borderRadius: 5,
    color: theme.palette.common.red,
    '& svg': {
      flexShrink: 0,
    },
  },
}));
