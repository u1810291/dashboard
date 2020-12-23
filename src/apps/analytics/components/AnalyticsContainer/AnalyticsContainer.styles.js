import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  statistic: {
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  total: {
    [theme.breakpoints.up('md')]: {
      order: -1,
    },
  },
  chartWrapper: {
    maxWidth: '100%',
  },
}));
