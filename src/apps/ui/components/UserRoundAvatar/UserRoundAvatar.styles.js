import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  roundAvatar: {
    height: '100%',
    minHeight: 30,
    minWidth: 30,
    fontWeight: 'bold',
    borderRadius: '50%',
    color: theme.palette.common.white,
    overflow: 'hidden',
  },
}));
