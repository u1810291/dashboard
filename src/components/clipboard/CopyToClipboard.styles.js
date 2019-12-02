import { makeStyles } from '@material-ui/core';
import { appPalette } from 'app.theme';

export const useStyles = makeStyles(() => ({
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
}));
