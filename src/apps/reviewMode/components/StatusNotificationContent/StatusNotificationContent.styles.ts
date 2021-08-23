import { makeStyles } from '@material-ui/core';
import { appPalette } from 'apps/theme/app.palette';

export const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.common.black75,
    textDecoration: 'underline',
    '&:hover, &:focus': {
      textDecoration: 'none',
    },
  },
  verified: {
    color: appPalette.green,
    fontWeight: 'bold',
  },
  rejected: {
    color: appPalette.red,
    fontWeight: 'bold',
  },
}));
