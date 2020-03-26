import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  container: {
    width: 400,
    minHeight: 140,
    display: 'flex',
    flexDirection: 'column',
    padding: [[20, 40]],
    overflowY: 'auto',
  },
  oldPassword: {
    marginBottom: 20,
  },
  repeatPassword: {
    marginBottom: 40,
  },
}));
