import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  tab: {
    position: 'relative',
    borderRadius: 5,
    border: '2px solid transparent',
    fontWeight: 'bold',
    color: theme.palette.common.black75,
    backgroundColor: theme.palette.foreground.main,
    cursor: 'pointer',
    transition: '.2s all ease-in-out',
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  selected: {
    color: theme.palette.common.black90,
    borderColor: theme.palette.common.lightblue,
  },
}));
