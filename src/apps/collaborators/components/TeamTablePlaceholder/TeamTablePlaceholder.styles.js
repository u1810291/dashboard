import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tablePlaceholder: {
    [theme.breakpoints.up('md')]: {
      marginTop: -30,
    },
  },
  tablePlaceholderText: {
    maxWidth: 240,
    margin: '0 auto -16px',
    color: theme.palette.common.black75,
    lineHeight: '1.2',
  },
}));
