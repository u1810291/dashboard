import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  button: {
    justifyContent: 'flex-start',
    marginBottom: 10,
    padding: [[8, 10]],
    fontSize: 14,
    fontWeight: 700,
    borderRadius: 5,
    color: theme.palette.text.main,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.lightblueopacity,
    },
  },
  selected: {
    color: theme.palette.common.lightblue,
    backgroundColor: theme.palette.common.lightblueopacity,
    '&.MuiButton-root:hover': {
      backgroundColor: theme.palette.common.lightblueopacity,
    },
  },
}));
