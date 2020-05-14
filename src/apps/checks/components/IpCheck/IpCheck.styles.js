import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  map: {
    padding: 0,
    textAlign: 'right',
    '&>img': {
      borderRadius: 5,
      maxHeight: '100%',
    },
  },
  mapContainer: {
    [theme.breakpoints.down('xs')]: {
      flexShrink: 1,
      flexGrow: 1,
    },
  },
  values: {
    color: '#8392B8',
  },
}));
