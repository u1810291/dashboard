import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
    boxShadow: 'none',
    marginBottom: 20,
  },
  label: {
    color: '#929292',
  },
  value: {
    color: '#242424',
  },
}));
