import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  root: {
    border: '2px solid transparent',
    borderRadius: 10,
    transition: '.2s all ease-in-out',
    '&.selected': {
      borderColor: theme.palette.common.lightblue,
    },
  },
  selected: {
    borderColor: theme.palette.common.lightblue,
  },
}));
