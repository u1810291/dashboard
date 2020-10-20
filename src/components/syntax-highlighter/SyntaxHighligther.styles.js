import { makeStyles } from '@material-ui/core';
import { appPalette } from 'apps/theme/app.palette';

export const useStyles = makeStyles(() => ({
  bordered: {
    border: `1px solid ${appPalette.black50}`,
    borderRadius: 5,
  },
  content: {
    maxHeight: 227,
    overflow: 'scroll',
    padding: '0 1rem',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      height: 5,
      width: 5,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(237, 240, 245, .2)',
      borderRadius: 10,
    },
  },
}));
