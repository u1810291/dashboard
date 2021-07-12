import { withStyles, Button } from '@material-ui/core';

export const SideButton = withStyles((theme) => ({
  root: {
    minWidth: 174,
    height: 50,
    fontSize: 14,
    padding: [[6, 10]] as any,
    borderRadius: 5,
    backgroundColor: theme.palette.background.default,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
    color: theme.palette.text.main,
    [theme.breakpoints.down(1080)]: {
      width: 50,
      minWidth: 50,
      overflow: 'hidden',
    },
    '&:hover': {
      backgroundColor: theme.palette.common.black7,
    },
    '&.Mui-disabled': {
      opacity: 0.5,
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.main,
    },
  },
  label: {
    paddingLeft: 5,
    whiteSpace: 'nowrap',
    justifyContent: 'flex-start',
    [theme.breakpoints.down(1080)]: {
      paddingLeft: 10,
    },
  },
  startIcon: {
    width: 17,
    marginRight: 10,
    [theme.breakpoints.down(1080)]: {
      marginRight: 20,
    },
  },
}))(Button);
