import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  button: {
    justifyContent: 'flex-start',
    marginBottom: 10,
    padding: [[8, 10]],
    fontSize: 14,
    fontWeight: 700,
    borderRadius: 5,
    color: theme.palette.common.black75,
    '& svg': {
      marginLeft: 'auto',
      paddingLeft: 4,
      fontSize: 17,
    },
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.lightblueopacity,
    },
  },
  selected: {
  color: theme.palette.common.black75,
},
}));
