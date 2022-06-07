import { Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tree: {
    padding: '0 3px 0 10px',
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
    padding: 0,
    borderRadius: 8,
  },
  headerControls: {
    display: 'flex',
    margin: '16px 0',
  },
  selectedAmount: {
    marginRight: 'auto',
    color: theme.palette.text.main,
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    fontStyle: 'italic',
    color: theme.palette.text.main,
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '0 0 1px 0',
      borderColor: theme.palette.common.black7,
      borderRadius: 0,
    },
  },
  searchIcon: {
    opacity: 0.5,
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',

    '& button': {
      fontSize: '16px !important',
      padding: '0 16px',
    },
  },
  submitButton: {
    minWidth: 170,
    marginLeft: 16,
  },
}));

export const StyledButtonBase = withStyles((theme) => ({
  root: {
    minHeight: '0 !important',
    color: theme.palette.text.main,
    background: theme.palette.common.gray,
    padding: '6px 12px',
    borderRadius: 40,
    lineHeight: '17px',
  },
}))(Button);
