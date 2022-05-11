import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 210,
    minHeight: 50,
    fontSize: 14,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.lightblue,
    '@media (min-width: 375px)': {
      minWidth: 250,
    },
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.lightbluehover,
    },
    '&.Mui-disabled': {
      opacity: 0.3,
      backgroundColor: theme.palette.common.lightblue,
      color: theme.palette.common.white,
    },
    '& svg': {
      marginRight: 5,
      fontSize: 17,
    },
  },
}));
