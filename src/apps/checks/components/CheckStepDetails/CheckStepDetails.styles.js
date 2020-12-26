import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  item: {
    width: '100%',
    marginBottom: 16,
  },
  card: {
    width: '100%',
    boxShadow: 'none',
  },
  value: {
    fontWeight: 'bold',
    color: theme.palette.common.black90,
  },
}));
