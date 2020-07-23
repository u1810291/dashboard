import { Button, makeStyles, withStyles } from '@material-ui/core';
import { appPalette } from 'apps/theme/app.palette';

export const useStyles = makeStyles({
  breakAll: {
    wordBreak: 'break-all',
  },
});

export const RemoveButton = withStyles({
  root: {
    color: appPalette.red,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.02)',
    },
  },
})(Button);
