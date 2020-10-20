import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.black75,
    lineHeight: '1.1',
  },
  data: {
    lineHeight: '1.1',
    color: theme.palette.common.black90,
    '& .MuiIconButton-root': {
      color: theme.palette.common.black90,
    },
  },
}));
