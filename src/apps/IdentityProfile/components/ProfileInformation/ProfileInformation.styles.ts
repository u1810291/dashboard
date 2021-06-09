import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => createStyles({
  button: {
    flexShrink: 0,
    fontSize: 17,
    color: theme.palette.common.lightblue,
  },
  copy: {
    '& .MuiIconButton-root': {
      fontSize: 17,
    },
  },
}));
