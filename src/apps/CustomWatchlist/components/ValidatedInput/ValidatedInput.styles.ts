import { createStyles, withStyles } from '@material-ui/styles';
import { makeStyles, Select } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  input: {
    background: theme.palette.common.whiteblue,
    borderRadius: '5px',
    padding: '5px 10px',
  },
  inputValue: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      marginLeft: 5,
    },
  },
  colorBlue: {
    color: theme.palette.common.lightblue,
  },
  placeholder: {
    color: theme.palette.common.black75,
  },
  selectWrap: {
    '& .MuiInputBase-root:before, & .MuiInputBase-root:after': {
      display: 'none',
    },
  },
  headerWrap: {
    maxWidth: '50%',
  },
  headerItem: {
    lineHeight: 1.1,
  },
}));

export const SelectStyled = withStyles(() => ({
  root: {
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '17px',

    '&.MuiSelect-root': {
      paddingRight: 5,
      '&:focus': {
        background: 'transparent',
      },
    },
  },
}))(Select);
