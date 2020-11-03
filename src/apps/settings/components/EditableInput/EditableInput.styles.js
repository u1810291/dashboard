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
    alignItems: 'center',
    color: theme.palette.common.black90,
  },
  name: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 'bold',
  },
  icon: {
    flexShrink: 0,
    marginLeft: 8,
    fontSize: 17,
  },
}));
