import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.text.main,
    lineHeight: '1.1',
  },
  data: {
    lineHeight: '1.1',
    color: theme.palette.text.secondary,
    '& .MuiIconButton-root': {
      color: theme.palette.text.secondary,
    },
  },
}));
