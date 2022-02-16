import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => createStyles({
  root: {
    width: 330,
  },
  wrapper: {
    width: '100%',
    '& .react-flow': {
      overflow: 'initial',
      '& > div': {
        marginTop: 6,
      },
    },
  },
}));
