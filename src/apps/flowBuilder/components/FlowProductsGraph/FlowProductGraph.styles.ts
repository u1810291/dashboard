import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => createStyles({
  root: {
    maxHeight: 'calc(100vh - 220px)',
    width: '100%',
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
  wrapper: {
    height: 2000,
  },
}));
