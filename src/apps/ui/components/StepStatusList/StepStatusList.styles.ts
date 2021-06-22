import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { fullWidth: boolean }>((theme) => ({
  stepStatusList: ({ fullWidth }) => ({
    padding: 0,
    [theme.breakpoints.up('lg')]: {
      columnCount: fullWidth ? 1 : 2,
    },
  }),
  stepStatusListItem: {
    marginBottom: 12,
    padding: '0 10px 0 0',
  },
}));
