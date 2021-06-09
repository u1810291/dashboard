import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => createStyles({
  wrapper: {
    position: 'relative',
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  select: {
    padding: 20,
    backgroundColor: '#F6F7FA',
    borderRadius: 10,
    border: '2px solid transparent',
    transition: '.2s all ease-in-out',
  },
  selected: {
    borderColor: theme.palette.common.lightblue,
  },
  button: {
    padding: 0,
    color: theme.palette.common.black90,
    fontSize: 20,
  },
  collapse: {
    borderRadius: 10,
    boxShadow: '0 2px 4px rgba(52, 73, 94, 0.09)',
    backgroundColor: theme.palette.common.white,
  },
  rotated: {
    transform: 'rotate(180deg)',
  },
}));
