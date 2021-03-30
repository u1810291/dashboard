import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  label: {
    marginLeft: '10px',
  },
  select: {
    minHeight: 50,
    minWidth: 80,
    color: theme.palette.common.black75,
    '& .MuiSelect-select:focus': {
      backgroundColor: theme.palette.common.white,
    },
    '& .MuiOutlinedInput-input': {
      padding: [[16, 14]],
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.black75,
    },
    '& .MuiSelect-icon': {
      marginTop: 3,
      fontSize: 17,
      color: theme.palette.common.black75,
    },
  },
}));
