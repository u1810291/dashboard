import { makeStyles, withStyles } from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export const useStyles = makeStyles((theme) => ({
  searchModeWrapper: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 8,
  },
  searchModeToggle: {
    width: '100%',
    height: 35,
  },
}));

export const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: 2,
    width: '50%',
    border: 'none',
    color: theme.palette.primary.main,
    '&:not(:first-child)': {
      borderRadius: 6,
    },
    '&:first-child': {
      borderRadius: 6,
    },
    '&:hover': {
      backgroundColor: theme.palette.common.whiteblue,
    },
    '&.Mui-selected': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.common.whiteblue,
    },
    '&.Mui-selected:hover': {
      backgroundColor: theme.palette.common.whiteblue,
    },
  },
}))(ToggleButtonGroup);
