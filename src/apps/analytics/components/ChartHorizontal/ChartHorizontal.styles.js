import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  noDataLabel: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
  },
  chart: {
    '& .recharts-text': {
      fontSize: 12,
    },
  },
}));
