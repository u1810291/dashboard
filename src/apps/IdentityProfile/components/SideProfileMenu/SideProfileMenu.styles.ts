import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => createStyles({
  container: {
    height: '100%',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 5,
    fontSize: 20,
    color: theme.palette.common.black75,
    border: `1px solid ${theme.palette.common.black75}`,
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  rotated: {
    transform: 'rotate(180deg)',
  },
}));
