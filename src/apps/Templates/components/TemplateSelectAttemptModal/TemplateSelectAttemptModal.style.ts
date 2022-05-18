import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modal: {
    width: 290,
    backgroundColor: theme.palette.common.white,
    borderRadius: 12,
  },
  title: {
    display: 'inline-block',
    fontSize: 18,
    marginTop: 24,
    textAlign: 'center',
  },
  subtitle: {
    display: 'inline-block',
    fontSize: 18,
    marginTop: 18,
    textAlign: 'center',
  },
  continueButton: {
    marginTop: 16,
  },
}));
