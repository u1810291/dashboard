import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({

  paper: {
    background: theme.palette.text.secondary,
    color: theme.palette.common.black7,
  },
  supportBox: {
    marginLeft: 20,
    padding: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginBottom: 30,
    },
  },
}));
