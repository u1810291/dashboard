import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  noDataLabel: {
    position: 'absolute',
    zIndex: 1,
    top: '45%',
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.palette.common.black75,
  },
  chart: {
    maxWidth: 'calc(100% - 20px)',
  },
  chartWork: {
    '@media (max-width: 425px)': {
      minWidth: 300,
    },
    '& .recharts-tooltip-cursor': {
      display: 'none',
    },
  },
  chartWrapper: {
    position: 'relative',
    '@media (max-width: 425px)': {
      overflowX: 'scroll',
    },
  },
}));
