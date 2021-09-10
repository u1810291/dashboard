import { makeStyles } from '@material-ui/core';
import { appPalette } from 'apps/theme/app.palette';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    color: theme.palette.text.main,
  },
  item: {
    width: '100%',
    marginBottom: 16,
  },
  card: {
    width: '100%',
    border: 'none',
    filter: 'none',
    boxShadow: 'none',
  },
  value: {
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
  },
  label: {
    color: theme.palette.text.main,
  },
  failed: {
    color: appPalette.red,
  },
}));
