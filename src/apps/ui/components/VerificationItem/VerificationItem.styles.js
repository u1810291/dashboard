import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  select: {
    transition: '.2s all ease-in-out',
  },
  selected: {
    backgroundColor: '#F6F7FA',
  },
  id: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});
