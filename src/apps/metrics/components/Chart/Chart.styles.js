import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  text: {
    fontSize: 16,
    lineHeight: '19px',
  },
  amountText: {
    display: 'inline-block',
    padding: [[10, 0, 20]],
  },
  noDataLabel: {
    fontSize: '1.25rem',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));
