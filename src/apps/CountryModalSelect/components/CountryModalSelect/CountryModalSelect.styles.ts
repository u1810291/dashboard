import { ButtonBase } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tree: {
    padding: 0,
    '& > *': {
      scrollbarWidth: 'thin',
      '&::-webkit-scrollbar': {
        height: 5,
        width: 5,
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      '&::-webkit-scrollbar-corner': {
        backgroundColor: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.common.black50,
        borderRadius: 10,
      },
    },
  },
  formBox: {
    position: 'relative',
    maxHeight: '100%',
    padding: '0 3px 0 10px',
  },
}));

export const StyledButtonBase = withStyles((theme) => ({
  root: {
    minHeight: '0 !important',
    color: theme.palette.text.main,
    textDecoration: 'underline',
  },
}))(ButtonBase);
