import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  geographicalAreas: {
    minWidth: 180,
    fontSize: 12,
    borderRadius: 5,
    color: theme.palette.common.black7,
    backgroundColor: theme.palette.common.black90,
    [theme.breakpoints.up('md')]: {
      minWidth: 250,
    },
  },
}));
