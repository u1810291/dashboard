import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  root: {
    borderRadius: 10,
    backgroundColor: theme.palette.common.white,
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      maxHeight: 'calc(100vh - 295px)',
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
  wrapper: {
    position: 'relative',
  },
  buttonClose: {
    position: 'absolute',
    top: -20,
    right: -16,
    padding: 10,
    color: theme.palette.common.black75,
  },
}));
