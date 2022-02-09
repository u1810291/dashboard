import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  infoWrapper: {
    width: 'calc(50% - 20px)',
    marginBottom: 20,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
  },
  infoValue: {
    marginBottom: 6,
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    lineHeight: 1.2,
  },
  label: {
    color: theme.palette.text.main,
  },
}));
