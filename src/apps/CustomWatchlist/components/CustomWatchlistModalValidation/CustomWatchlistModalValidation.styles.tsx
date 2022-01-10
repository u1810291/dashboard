import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.common.white,
    padding: '21px 40px',
    minHeight: 600,
    height: 650,
    width: 700,
  },
  modalTitle: {
    lineHeight: '29px',
    marginBottom: 40,
  },
  colorGrey: {
    color: theme.palette.text.main,
  },
  closeButton: {
    cursor: 'pointer',
    position: 'absolute',
    top: '15px',
    right: '15px',
    width: '20px',
    height: '20px',
    color: theme.palette.button.close.main,
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
  error: {
    color: theme.palette.common.red,
  },
  buttonContainer: {
    position: 'fixed',
    bottom: 20,
    left: 0,
    padding: '0 40px',
    background: theme.palette.common.white,
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
