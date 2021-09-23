import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    overflowY: 'hidden',
    wordBreak: 'break-word',
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 20,
      padding: [[20, 0]],
      boxShadow: '0px 1px 5px rgba(52, 73, 94, 0.2)',
      borderRadius: 5,
      backgroundColor: theme.palette.common.white,
      overflowY: 'auto',
      '&:last-of-type': {
        marginBottom: 0,
      },
    },
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      alignItems: 'center',
    },
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.lightblueopacity,
      [theme.breakpoints.up('lg')]: {
        '& .MuiIconButton-root': {
          opacity: 1,
        },
      },
    },
  },
  itemNameWrapper: {
    padding: [[0, 20]],
    [theme.breakpoints.up('lg')]: {
      width: '36%',
      padding: [[14, 20]],
    },
  },
  itemName: {
    lineHeight: 1.2,
  },
  itemNameEmpty: {
    color: theme.palette.common.black50,
    lineHeight: 1.4,
  },
  itemData: {
    padding: [[0, 20]],
    [theme.breakpoints.down('md')]: {
      fontWeight: 'bold',
    },
    [theme.breakpoints.up('lg')]: {
      width: '20%',
      padding: [[14, 20]],
    },
  },
  itemStatusWrapper: {
    position: 'relative',
    padding: [[0, 20]],
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '24%',
      padding: [[14, 0, 14, 20]],
    },
  },
  itemStatus: {
    [theme.breakpoints.up('lg')]: {
      width: '66%',
    },
  },
  itemIcons: {
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '33%',
    },
  },
  label: {
    color: theme.palette.common.black75,
    fontWeight: 'normal',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  iconDeleteWrapper: {
    width: 36,
    padding: [[4, 0]],
    textAlign: 'right',
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
      zIndex: 1,
      top: 10,
      right: 10,
      padding: 0,
    },
  },
  iconReviewWrapper: {
    width: 36,
    padding: [[4, 0, 4, 10]],
    textAlign: 'right',
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      zIndex: 1,
      top: '50%',
      right: 15,
      transform: 'translateY(-50%)',
    },
  },
  iconButtonDelete: {
    padding: 10,
    fontSize: 17,
    [theme.breakpoints.up('lg')]: {
      padding: [[4, 10]],
      opacity: 0,
      transition: '.2s all ease-in-out',
    },
  },
  iconButtonReview: {
    padding: 5,
    backgroundColor: theme.palette.common.yellow,
    borderRadius: 0,
    color: theme.palette.common.black90,
    '& .MuiSvgIcon-root': {
      fontSize: 15,
    },
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.yellow,
    },
  },
  tooltip: {
    maxWidth: 80,
    margin: [[-2, 0, 0, 1]],
    padding: [[6, 8]],
    fontSize: 12,
    lineHeight: 1.2,
    color: theme.palette.common.black7,
    textAlign: 'center',
    backgroundColor: theme.palette.common.black90,
  },
  tooltipArrow: {
    marginBottom: '-0.68em',
    color: theme.palette.common.black90,
  },
}));
