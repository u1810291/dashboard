import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  label: {
    marginLeft: 10,
  },
  select: {
    minHeight: 40,
    width: 70,
    color: theme.palette.common.black75,
    '& .MuiSelect-select:focus': {
      backgroundColor: theme.palette.common.white,
    },
    '& .MuiOutlinedInput-input': {
      padding: [[12, 14]],
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
