import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  colorGrey: {
    color: theme.palette.text.main,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  buttonRunning: {
    marginRight: 10,
    display: 'inline-block',
  },
  marginBottom50: {
    marginBottom: 50,
  },
  buttonContainer: {
    position: 'fixed',
    bottom: 20,
    left: 0,
    padding: '0 40px',
    background: theme.palette.common.white,
  },
  validationHelperWrap: {
    position: 'relative',
  },
  validationHelper: {
    position: 'absolute',
    top: -10,
    right: 50,
    color: theme.palette.common.black75,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'calc(100% - 70px)',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));
