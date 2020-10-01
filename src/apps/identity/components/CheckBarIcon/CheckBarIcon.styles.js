import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  icon: {
    maxWidth: 50,
    maxHeight: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    flexGrow: 0,
  },
}));
