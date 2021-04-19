import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 14,
    color: theme.palette.text.main,
  },
  button: {
    minWidth: 280,
    padding: 12,
    borderColor: theme.palette.common.lightblue,
    fontSize: 14,
    color: theme.palette.common.lightblue,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.whiteblue,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minWidth: 'initial',
    },
  },
}));
