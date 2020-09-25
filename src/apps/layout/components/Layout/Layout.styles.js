import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
  },
  content: {
    display: 'flex',
    maxWidth: '100%',
    flexDirection: 'column',
    minHeight: '100vh',
    flexGrow: 1,
  },
}));
