import { Button, withStyles } from '@material-ui/core';

export const ButtonOutlined = withStyles((theme) => ({
  root: {
    padding: 4,
    borderColor: theme.palette.common.lightblue,
    color: theme.palette.common.lightblue,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.whiteblue,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 6,
    },
  },
}))(Button);
