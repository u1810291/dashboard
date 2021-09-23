import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  root: {
    flexGrow: 1,
    borderRadius: 10,
    backgroundColor: theme.palette.common.white,
    width: '100%',
  },
  container: {
    maxHeight: 'calc(100vh - 175px)',
    overflowY: 'auto',
    overflowX: 'hidden',
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
