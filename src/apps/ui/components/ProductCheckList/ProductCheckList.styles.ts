import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>((theme) => ({
  stepStatusList: {
    padding: 0,
    [theme.breakpoints.up('lg')]: {
      columnCount: 2,
    },
  },
  fullWidth: {
    [theme.breakpoints.up('lg')]: {
      columnCount: 1,
    },
  },
  stepStatusListItem: {
    marginBottom: 12,
    padding: '0 10px 0 0',
    verticalAlign: 'top',
    pageBreakInside: 'avoid',
    breakInside: 'avoid',
  },
}));
