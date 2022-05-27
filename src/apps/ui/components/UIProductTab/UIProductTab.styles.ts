import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  tab: {
    position: 'relative',
    borderRadius: 5,
    border: '2px solid transparent',
    fontWeight: 'bold',
    color: theme.palette.text.main,
    backgroundColor: theme.palette.foreground.main,
    cursor: 'pointer',
    transition: '.2s all ease-in-out',
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  selected: {
    color: theme.palette.text.secondary,
    borderColor: theme.palette.common.lightblue,
  },
  disabled: {
    backgroundColor: theme.palette.common.lightRed,
  },
}));
