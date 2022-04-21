import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  menuItem: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: 300,
    display: 'block',
  },
}));
