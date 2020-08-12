import { Button, withStyles } from '@material-ui/core';

export const ButtonBase = withStyles((theme) => ({
  root: {
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    textAlign: 'left',
    fontSize: 14,
    padding: [[8, 16]],

    '&:hover': {
      backgroundColor: '#E3E6F7',
    },
    '&.active': {
      color: theme.palette.primary.main,
      backgroundColor: '#EBEEFF',
    },
  },
}))(Button);
