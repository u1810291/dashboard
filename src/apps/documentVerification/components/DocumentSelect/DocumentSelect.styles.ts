import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  modal: {
    [theme.breakpoints.up('lg')]: {
      width: 500,
    },
    '& .MuiIconButton-root': {
      minHeight: 'auto',
      '&:not(.Mui-checked)': {
        color: theme.palette.common.black75,
      },
    },
  },
  control: {
    flexGrow: 1,
  },
  button: {
    minWidth: 170,
    transition: '.2s all ease-in-out',
    '&:disabled': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.common.lightblue,
      opacity: 0.5,
    },
  },
  wrapper: {
    '& label': {
      display: 'flex',
    },
  },
}));
