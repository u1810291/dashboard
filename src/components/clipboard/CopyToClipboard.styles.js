import { makeStyles } from '@material-ui/core';
import { appPalette } from 'apps/theme/app.palette';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  overlayed: {
    position: 'absolute',
    top: '0.75rem',
    right: '1rem',
    zIndex: 1,
    background: appPalette.white,
    borderRadius: '50%',
    padding: '0.2rem',
  },
  button: {
    color: theme.palette.common.lightblue,
  },
}));
