import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: 700,
    '& > main': {
      minHeight: 490,
    },
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginBottom: '40px',
  },
  subtitle: {
    marginBottom: '6px',
  },
  helpText: {
    color: theme.palette.common.black75,
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    '&::placeholder': {
      color: theme.palette.common.black50,
    },
    'input.MuiOutlinedInput-root': {
      color: theme.palette.common.black50,
    },
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontFamily: 'Lato',
    lineHeight: '17px',
    borderColor: theme.palette.common.black75,
    borderRadius: '5px',
    resize: 'none',
    '&::placeholder': {
      color: theme.palette.common.black50,
    },
  },
  contentHolder: {
    marginBottom: '40px',
  },
  select: {
    minHeight: 50,
    borderRadius: '4px',
    border: `1px solid ${theme.palette.common.black75}`,
    width: '100%',
    padding: '0 22px 0 10px',
    color: theme.palette.common.black75,
    '&:hover': {
      cursor: 'pointer',
      borderColor: theme.palette.common.lightblue,
    },
    input: {
      display: 'none',
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: theme.palette.common.white,
    },
    '& .MuiOutlinedInput-input': {
      display: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.black75,
    },
    '& .MuiSelect-icon': {
      marginTop: 3,
      fontSize: 17,
      right: '12px',
      color: theme.palette.common.black75,
    },
  },
}));
