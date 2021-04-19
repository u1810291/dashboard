import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.text.main,
    lineHeight: '1.1',
  },
  titleIcon: {
    flexShrink: 0,
    marginRight: 10,
    color: theme.palette.common.green,
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
  select: {
    minHeight: 30,
    padding: [[5, 10]],
    borderRadius: 5,
    '& svg': {
      flexShrink: 0,
    },
  },
  selectTitle: {
    fontWeight: 'normal',
  },
  selectArrow: {
    fontSize: 17,
    transition: '.2s all ease-in-out',
    color: theme.palette.text.main,
  },
}));
