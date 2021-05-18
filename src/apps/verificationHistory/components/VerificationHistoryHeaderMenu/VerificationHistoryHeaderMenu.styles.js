import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  buttonBack: {
    minWidth: 200,
    [theme.breakpoints.down(1120)]: {
      minWidth: 50,
      height: 50,
    },
    [theme.breakpoints.down(425)]: {
      '& > span:first-child': {
        paddingLeft: 11,
      },
    },
  },
}));
