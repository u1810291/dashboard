import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  input: {
    maxWidth: 'calc(100% + 20px)',
    margin: [[-5, 0, -5, -8]],
    padding: [[4, 6]],
    color: theme.palette.common.black90,
    fontFamily: 'inherit',
    fontWeight: 'bold',
    fontSize: 'inherit',
    outline: 'none',
    borderRadius: 5,
    border: `1px solid ${theme.palette.common.lightblue}`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% + 20px)',
    },
  },
  nameWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    color: theme.palette.common.black90,
  },
  name: {
    fontWeight: 'bold',
  },
  icon: {
    margin: '6px 0 0 10px',
    fontSize: 17,
  },
}));
