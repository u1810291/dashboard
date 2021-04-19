import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  radio: {
    color: theme.palette.text.main,
  },
  label: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  labelDescription: {
    color: theme.palette.text.main,
  },
  image: {
    color: theme.palette.text.main,
  },
}));
