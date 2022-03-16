import { makeStyles, withStyles } from '@material-ui/core';
import Select from '@material-ui/core/Select';

export const useStyles = makeStyles((theme) => ({
  buttonIcon: {
    paddingRight: 5,
    position: 'absolute',
    right: 5,
    color: theme.palette.common.gray68,
  },
}));

export const StyledSelect = withStyles(() => ({
  select: {
    position: 'relative',
    zIndex: 1,
    paddingRight: 40,
  },
  outlined: {
    paddingRight: 40,
  },
  filled: {
    paddingRight: 40,
  },
}))(Select);
