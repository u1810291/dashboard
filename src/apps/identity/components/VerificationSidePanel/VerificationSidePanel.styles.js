import { withStyles, Button } from '@material-ui/core';

export const SideButton = withStyles((theme) => ({
  root: {
    height: 40,
    fontSize: 14,
    backgroundColor: theme.palette.background.default,
    '&:hover': {
      backgroundColor: '#F6F6F6',
      borderColor: '#F6F6F6',
    },
  },
  label: {
    paddingLeft: 10,
    whiteSpace: 'nowrap',
    justifyContent: 'flex-start',
  },
  startIcon: {
    marginRight: 15,
  },
}))(Button);
