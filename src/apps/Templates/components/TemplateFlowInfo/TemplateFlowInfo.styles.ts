import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  name: {
    wordBreak: 'break-word',
  },
  field: {
    '& .MuiIconButton-root': {
      minHeight: 'auto',
      fontSize: 20,
    },
  },
  button: {
    marginRight: 20,
    padding: 0,
  },
}));
