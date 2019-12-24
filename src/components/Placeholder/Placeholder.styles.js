import { makeStyles } from '@material-ui/core';
import { appPalette } from 'app.theme';

export const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: appPalette.lightgray,
    height: '1em',
    borderRadius: '2px',
  },
}));
