import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'absolute',
    top: -10,
    right: -10,
    lineHeight: 0,
    borderRadius: '50%',
    '& svg circle': {
      stroke: theme.palette.common.yellow,
    },
  },
}));
