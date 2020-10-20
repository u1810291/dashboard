import { IconButton, InputAdornment, TextField, withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const TextFieldSearch = withStyles((theme) => ({
  root: {
    borderRadius: 5,
    backgroundColor: theme.palette.background.default,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
    '& .MuiOutlinedInput-root': {
      '& input': {
        borderRadius: 5,
      },
      '&.Mui-focused fieldset': {
        borderWidth: 1,
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
    },
  },
}))(TextField);

export const InputAdornmentSearch = withStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
}))(InputAdornment);

export const IconButtonSearch = withStyles((theme) => ({
  root: {
    fontSize: 17,
    color: theme.palette.common.black75,
  },
}))(IconButton);

export const useStyles = makeStyles((theme) => ({
  search: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  searchButton: {
    minWidth: 50,
    minHeight: 50,
    borderRadius: 5,
    backgroundColor: theme.palette.background.default,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
    '& svg': {
      fontSize: 17,
      color: theme.palette.common.black75,
    },
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
}));
