import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    color: theme.palette.text.main,
    border: 'none',
    filter: 'none',
    boxShadow: 'none',
  },
}));
