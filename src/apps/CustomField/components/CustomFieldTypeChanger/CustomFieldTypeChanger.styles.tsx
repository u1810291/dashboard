import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

export const SmallButton = withStyles({
  root: {
    maxHeight: 30,
    minHeight: 'unset !important',
    minWidth: 'unset !important',
    width: 'max-content',
    borderRadius: 5,
  },
})(Button);
