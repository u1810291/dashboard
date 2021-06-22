import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => createStyles({
  button: {
    fontSize: 17,
    color: theme.palette.common.lightblue,
  },
  field: {
    width: '100%',
    '& .MuiInputBase-input': {
      color: theme.palette.common.black75,
    },
    '& .MuiInput-underline:before': {
      display: 'none',
    },
  },
}));
