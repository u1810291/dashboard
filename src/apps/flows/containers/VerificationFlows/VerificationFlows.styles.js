import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.black75,
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  table: {
    width: '100%',
  },
  paper: {
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
  buttonWrapper: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      '& span': {
        width: '100%',
      },
    },
  },
  button: {
    minWidth: 250,
    minHeight: 50,
    fontSize: 14,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.lightblue,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.lightbluehover,
    },
    '&.Mui-disabled': {
      opacity: 0.3,
      backgroundColor: theme.palette.common.lightblue,
      color: theme.palette.common.white,
    },
    '& svg': {
      marginRight: 5,
      fontSize: 17,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  tooltip: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 175,
    minHeight: 50,
    marginRight: 8,
    padding: 8,
    fontSize: 12,
    lineHeight: 1.2,
    color: theme.palette.common.black7,
    backgroundColor: theme.palette.common.black90,
    [theme.breakpoints.down('sm')]: {
      minWidth: 250,
      margin: [[8, 0]],
    },
  },
  tooltipPopper: {
    zIndex: 900,
  },
  tooltipArrow: {
    color: theme.palette.common.black90,
  },
}));