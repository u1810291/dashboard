import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  root: {
    background: '#fff',
    padding: '21px 40px',
    width: 700,
  },
  modalTitle: {
    lineHeight: '29px',
    marginBottom: 40,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  colorGrey: {
    color: theme.palette.text.main,
  },
  placeholder: {
    color: theme.palette.text.disabled,
  },
  closeButton: {
    cursor: 'pointer',
    position: 'absolute',
    top: '15px',
    right: '15px',
    width: '20px',
    height: '20px',
    // @ts-ignore
    color: theme.palette.button.close.main,
  },
}));
