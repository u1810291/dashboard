import { makeStyles } from '@material-ui/core';


export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.common.white,
    padding: '21px 40px',
    height: 'calc(100vh - 42px)',
    width: 700,
    overflowY: 'auto',
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
    position: 'relative',
  },
  validationHelper: {
    position: 'absolute',
    top: -10,
    right: 10,
    color: theme.palette.common.black75,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'calc(100% - 70px)',
  },
}));
