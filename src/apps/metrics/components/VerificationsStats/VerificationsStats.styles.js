import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  title: {
    flex: '0 0 auto',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    marginBottom: '1rem',
  },
  paper: {
    position: 'relative',
    flex: '1 0 auto',
  },
}));
