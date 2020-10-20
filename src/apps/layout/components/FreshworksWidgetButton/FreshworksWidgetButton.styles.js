import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.common.lightblue,
    fontWeight: 700,
    borderColor: theme.palette.common.lightblue,
    padding: [[5, 11]],
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.whiteblue,
    },
  },
}));
