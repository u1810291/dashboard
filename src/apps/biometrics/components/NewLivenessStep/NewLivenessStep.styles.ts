import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingBottom: 20,
    [theme.breakpoints.up('xl')]: {
      flexBasis: 'calc(33.33% + 30px)',
      maxWidth: 'calc(33.33% + 30px)',
      padding: [[0, 20, 0, 0]],
    },
  },
  mediaItem: {
    margin: '0 20px 20px 0',
    minWidth: 140,
    maxWidth: 140,
  },
  status: {
    [theme.breakpoints.up('xl')]: {
      flexBasis: 'calc(66.66% - 30px)',
      maxWidth: 'calc(66.66% - 30px)',
    },
  },
}));
