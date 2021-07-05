import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  container: {
    flexGrow: 1,
    borderRadius: 10,
    backgroundColor: theme.palette.common.white,
  },
  titleIcon: {
    flexShrink: 0,
    fontSize: 15,
    strokeWidth: 1.5,
  },
  list: {
    [theme.breakpoints.up('lg')]: {
      maxHeight: 'calc(100vh - 275px)',
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
  },
}));
