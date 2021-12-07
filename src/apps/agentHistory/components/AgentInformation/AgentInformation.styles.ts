import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  select: {
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
    '& .MuiSelect-selectMenu': {
      padding: '0 24px 0 0',
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
  spinner: {
    backgroundColor: theme.palette.primary.main,
  },
  button: {
    backgroundColor: theme.palette.common.lightblue,
    borderColor: theme.palette.common.lightblue,
    border: '1px solid',
    color: theme.palette.primary.contrastText,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.lightbluehover,
    },
  },
  buttonLoading: {
    border: 0,
  },
  input: {
    color: theme.palette.text.secondary,
    fontFamily: 'inherit',
    fontWeight: 'bold',
    fontSize: 'inherit',
    outline: 'none',
    borderRadius: 5,
    border: `1px solid ${theme.palette.common.lightblue}`,
    '& .MuiInputBase-input': {
      padding: '2px 1px',
    },
  },
}));
