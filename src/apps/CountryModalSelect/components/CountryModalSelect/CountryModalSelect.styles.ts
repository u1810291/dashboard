import { ButtonBase } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modal: {
    width: 400,
  },
  modalTitle: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  modalSubTitle: {
    maxWidth: 'initial',
    textAlign: 'left',
    color: theme.palette.text.main,
  },
  tree: {
    padding: 0,

    '&:before': {
      content: '""',
      width: 1,
      height: '100%',
      background: theme.palette.common.black7,
      display: 'block',
      position: 'absolute',
      left: 10,
    },
  },
  formBox: {
    overflow: 'scroll',
    position: 'relative',
    maxHeight: '100%',
    padding: '0 10px',
  },
}));

export const StyledButtonBase = withStyles((theme) => ({
  root: {
    minHeight: '0 !important',
    color: theme.palette.text.main,
    textDecoration: 'underline',
  },
}))(ButtonBase);
