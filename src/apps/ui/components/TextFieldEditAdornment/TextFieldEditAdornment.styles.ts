import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginRight: 0,
    padding: 5,
    color: '#8392B8',
  },
  input: {
    '& input, & .MuiInputBase-root': {
      padding: theme.spacing(1),
    },
    '& .Mui-disabled': {
      color: theme.palette.common.black90,
    },
    minWidth: 320,
    color: theme.palette.common.black90,
  },
  adornment: {
    '& img': {
      width: 21,
      height: 21,
    },
  },
  adornmentRoot: {
    minWidth: '2em',
  },
  viewMode: {
    '& fieldset': {
      border: 'none',
    },
  },
}));
