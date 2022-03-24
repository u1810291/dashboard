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
  centeredItem: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
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
  groupImage: {
    width: 'auto',
    height: 'auto',
    maxHeight: 350,
    maxWidth: 250,
    backgroundSize: 'cover',
  },
}));
