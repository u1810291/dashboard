import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  toolBar: {
    flexGrow: 1,
    minHeight: 50,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
  },
}));
