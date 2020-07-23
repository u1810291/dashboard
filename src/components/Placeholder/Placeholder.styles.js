import { makeStyles } from '@material-ui/core';
import { appPalette } from 'apps/theme/app.palette';

export const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: appPalette.lightgray,
    height: '1em',
    borderRadius: '2px',
  },
}));
