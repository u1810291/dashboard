import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    padding: [[8, 12]],
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    lineHeight: 1.25,
  },
  icon: {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 0,
    marginRight: 10,
  },
  content: {
    flexGrow: 1,
  },
}));
