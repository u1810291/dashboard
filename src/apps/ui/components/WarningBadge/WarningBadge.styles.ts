import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    borderRadius: '50%',
    '& svg circle': {
      stroke: theme.palette.common.yellow,
    },
    lineHeight: 0,
  },
  default: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
}));
