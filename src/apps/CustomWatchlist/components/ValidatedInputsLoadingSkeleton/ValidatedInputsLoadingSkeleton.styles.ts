import { withStyles } from '@material-ui/styles';
import Skeleton from '@material-ui/lab/Skeleton';

export const SkeletonStyled = withStyles(({
  text: {
    transform: 'scale(1, 0.80)',
  },
}))(Skeleton);
