import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.common.white,
    borderRadius: 10,
  },
  container: {
    maxHeight: 'calc(100vh - 120px)',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      height: 5,
      width: 5,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.common.black7,
      borderRadius: 10,
    },
  },
}));
