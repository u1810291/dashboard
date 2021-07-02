import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    '& + label': {
      marginTop: 2,
    },
  },
  control: {
    width: '100%',
    color: theme.palette.text.secondary,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.palette.text.secondary,
    transform: 'translate(0, 1.5px)',
    '&.Mui-focused, &.Mui-disabled': {
      color: theme.palette.text.secondary,
    },
    '& + [class*="MuiInput-formControl"]': {
      marginTop: 20,
    },
  },
  select: {
    color: theme.palette.text.secondary,
    '&::before, &::after': {
      display: 'none',
    },
    '& input': {
      padding: [[6, 0]],
      fontWeight: 'bold',
    },
    '&.Mui-disabled': {
      color: theme.palette.text.secondary,
    },
  },
}));
