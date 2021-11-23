import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
  content: {
    display: 'flex',
    maxWidth: '100%',
    flexDirection: 'column',
    minHeight: '100vh',
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      overflow: 'auto',
    },
  },
}));
