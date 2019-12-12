import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    background: '#F7F7F7',
    borderRadius: 5,
    boxShadow: 'none',
  },
  label: {
    color: '#929292',
  },
  value: {
    color: '#242424',
  },
}));
