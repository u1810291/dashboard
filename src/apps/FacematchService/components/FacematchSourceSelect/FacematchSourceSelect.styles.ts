import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  select: {
    minHeight: 50,
    marginBottom: 10,
    '& .MuiSelect-select:focus': {
      backgroundColor: theme.palette.common.white,
    },
    '& .MuiOutlinedInput-input': {
      padding: '16px 14px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.black7,
    },
    '& .MuiSelect-icon': {
      marginTop: 3,
      fontSize: 17,
      color: theme.palette.text.main,
    },
  },
}));
