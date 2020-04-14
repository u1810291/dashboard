import { makeStyles } from '@material-ui/core';
import { appPalette } from 'app.theme';

export const useStyles = makeStyles({
  card: {
    width: 174,
    border: `1px solid ${appPalette.lightgray}`,
  },
  media: {
    marginTop: 16,
    height: 70,
    width: 70,
    objectFit: 'contain',
  },
});