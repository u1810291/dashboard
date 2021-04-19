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
      color: theme.palette.text.main,
    },
  },
  wrapper: {
    '& > *': {
      padding: [[0, 0, 20]],
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-end',
      '& > *': {
        padding: [[0, 20, 0, 0]],
        '&:last-of-type': {
          padding: 0,
        },
      },
    },
  },
  buttonWebhook: {
    height: '100%',
    minHeight: 50,
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.palette.text.main,
    borderColor: theme.palette.common.black7,
    '& svg': {
      marginRight: 5,
      fontSize: 17,
    },
  },
  buttonDocument: {
    height: '100%',
    minHeight: 50,
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: theme.palette.text.secondary,
    color: theme.palette.common.black7,
    transition: '.25s opacity ease-in-out',
    '& svg': {
      marginLeft: 5,
      fontSize: 17,
    },
    '&:hover, &:focus': {
      backgroundColor: theme.palette.text.secondary,
      opacity: 0.8,
    },
  },
  tabsItemsWrapper: {
    [theme.breakpoints.up('lg')]: {
      borderTop: `1px solid ${theme.palette.common.black7}`,
    },
  },
  tabsWrapper: {
    borderRight: `1px solid ${theme.palette.common.black7}`,
    [theme.breakpoints.down('md')]: {
      borderBottom: `1px solid ${theme.palette.common.black7}`,
      borderRight: 'none',
    },
  },
}));
