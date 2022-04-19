import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 30,
    height: 17,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(13px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: theme.palette.common.green,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 15,
    height: 15,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.common.black50}`,
    backgroundColor: theme.palette.common.black50,
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}));
