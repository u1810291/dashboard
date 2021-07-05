import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  image: {
    flexShrink: 0,
    width: 50,
    height: 50,
    fontSize: 20,
    borderRadius: '50%',
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    color: theme.palette.text.secondary,
  },
}));
