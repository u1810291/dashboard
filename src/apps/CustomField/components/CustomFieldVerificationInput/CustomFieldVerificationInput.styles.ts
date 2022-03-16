import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: 'normal',
    color: theme.palette.text.main,
  },
  inputWrapper: {
    '& input': {
      width: '100%',
      padding: '6px 10px',
      color: theme.palette.text.secondary,
      border: [[1, 'solid', theme.palette.common.black75]],
      borderRadius: 5,
      backgroundColor: theme.palette.background.default,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .Mui-focused input, & input:hover': {
      borderColor: theme.palette.common.lightblue,
    },
  },
}));
