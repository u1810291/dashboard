import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  button: {
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: [[8, 10]],
    fontSize: 14,
    fontWeight: 700,
    borderRadius: 5,
    color: theme.palette.common.black75,
    '& svg': {
      fontSize: 17,
      transition: '.25s all ease-in-out',
    },
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.lightblueopacity,
    },
  },
  selected: {
    color: theme.palette.common.lightblue,
  },
  open: {
    '& svg': {
      color: theme.palette.common.black75,
      transform: 'rotate(180deg)',
    },
  },
}));
