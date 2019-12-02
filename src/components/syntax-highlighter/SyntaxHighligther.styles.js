import { makeStyles } from '@material-ui/core';
import { appPalette } from 'app.theme';

export const useStyles = makeStyles(() => ({
  bordered: {
    border: `1px solid ${appPalette.lightgray}`,
    borderRadius: 4,
  },
  content: {
    maxHeight: 227,
    overflow: 'scroll',
    padding: '0 1rem',
  },
}));
