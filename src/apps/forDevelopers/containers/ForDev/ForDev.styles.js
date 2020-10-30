import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
      color: theme.palette.common.black75,
    },
  },
  wrapper: {
    '& > *': {
      paddingRight: 20,
      '&:first-of-type, &:last-of-type': {
        paddingRight: 0,
      },
    },
    [theme.breakpoints.up('lg')]: {
      '& > *': {
        paddingRight: 20,
        '&:first-of-type': {
          paddingRight: 20,
        },
        '&:last-of-type': {
          paddingRight: 0,
        },
      },
    },
  },
  buttonWebhook: {
    height: '100%',
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.palette.common.black75,
    borderColor: theme.palette.common.black7,
    '& svg': {
      marginRight: 5,
      fontSize: 17,
    },
  },
  buttonDocument: {
    height: '100%',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: theme.palette.common.black90,
    color: theme.palette.common.black7,
    '& svg': {
      marginLeft: 5,
      fontSize: 17,
    },
  },
}));
