import { createStyles, Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => createStyles({
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
    minWidth: 88,
    transition: '.2s all ease-in-out',
    padding: theme.spacing(0.5, 1.5),
    marginLeft: theme.spacing(1),
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
  input: {
    '& fieldset': {
      border: `1.5px solid ${theme.palette.common.black50}`,
      borderColor: `${theme.palette.common.black50} !important`,
      '&:hover': {
        borderWidth: '1.5 !important',
      },
    },
  },
}));
