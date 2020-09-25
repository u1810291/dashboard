import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  input: {
    maxWidth: 'calc(100% + 20px)',
    margin: '-5px 0 -5px -10px',
    padding: 4,
    color: theme.palette.common.black90,
    fontFamily: 'inherit',
    fontWeight: 'bold',
    fontSize: 24,
    outline: 'none',
    borderRadius: 5,
    border: '1px solid #507DED',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% + 20px)',
    },
  },
  nameWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    '& img': {
      margin: '6px 0 0 10px',
    },
  },
  name: {
    fontWeight: 'bold',
    fontSize: 24,
    color: theme.palette.common.black90,
  },
}));
