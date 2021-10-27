import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom: {
    bottom: 0,
    position: 'absolute',
  },
  hidden: {
    opacity: 0,
    display: 'none',
  },
  radioGroup: {
    padding: '10px',
  },
  disabledStep: {
    opacity: 0.5,
  },
  email: {
    color: theme.palette.common.lightblue,
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
}));
