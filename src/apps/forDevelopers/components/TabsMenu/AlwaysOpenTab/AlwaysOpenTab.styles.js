import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tabWrapper: {
    '& > *': {
      marginLeft: 10,
    },
  },
  tab: {
    justifyContent: 'flex-start',
    marginBottom: 10,
    padding: [[8, 10]],
    fontSize: 14,
    fontWeight: 700,
    borderRadius: 5,
    color: theme.palette.common.black75,
  },
}));
