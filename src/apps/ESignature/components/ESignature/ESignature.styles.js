import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    boxShadow: 'none',
  },
  wrapper: {
    maxHeight: '350px',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      height: 5,
      width: 5,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.common.black7,
      borderRadius: 10,
    },
  },
  image: {
    width: '100%',
    textAlign: 'center',
    [theme.breakpoints.up('lg')]: {
      '& > div': {
        maxHeight: 320,
      },
      '& img': {
        maxHeight: 320,
      },
    },
    '& img': {
      margin: [[0, 'auto']],
      objectFit: 'cover',
      borderRadius: 5,
    },
  },
  title: {
    fontSize: 14,
    color: theme.palette.text.main,
  },
  button: {
    minWidth: 120,
    padding: '12px 20px',
    fontSize: '14px',
    marginLeft: 20,
    borderColor: theme.palette.common.lightblue,
    color: theme.palette.common.lightblue,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.whiteblue,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 6,
    },
  },
  select: {
    minHeight: 50,
    '& .MuiSelect-select:focus': {
      backgroundColor: theme.palette.common.white,
    },
    '& .MuiOutlinedInput-input': {
      padding: [[16, 14]],
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
