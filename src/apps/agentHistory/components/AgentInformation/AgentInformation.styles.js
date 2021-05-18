import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  select: {
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
    '& .MuiSelect-selectMenu': {
      padding: [[0, 24, 0, 0]],
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent',
    },
    '& .MuiSelect-icon': {
      top: '50%',
      transform: 'translateY(-50%)',
    },
  },
  value: {
    wordBreak: 'break-word',
  },
}));
