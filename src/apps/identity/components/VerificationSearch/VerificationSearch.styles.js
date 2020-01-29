import { TextField, withStyles } from '@material-ui/core';

export const TextFieldSearch = withStyles((theme) => ({
  root: {
    fontSize: 15,
    backgroundColor: theme.palette.background.default,
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderWidth: 1,
      },
    },
  },
}))(TextField);
