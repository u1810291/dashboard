import { Box, MenuItem, Select, withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  label: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.secondary.main,
    boxShadow: 1,
    borderRadius: 4,
    height: 40,
  },
}));

export const SelectSimple = withStyles((theme) => ({
  root: {
    width: '100%',
    padding: 13,
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    color: theme.palette.secondary.main,
    marginRight: 10,
    top: '50%',
    transform: 'translateY(-50%)',
  },
}))(Select);

export const MenuItemSimple = withStyles(() => ({
  root: {
    padding: 0,
    '&:first-child': {
      marginTop: -8,
    },
    '&:last-child': {
      marginBottom: -8,
    },
  },
}))(MenuItem);

export const OptionSimple = withStyles(() => ({
  root: {
    width: '100%',
    padding: '6px 16px',
  },
}))(Box);
