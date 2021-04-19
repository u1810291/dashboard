import { makeStyles } from '@material-ui/core';
import DocumentDisabled from '../../assets/icon-document-disabled.svg';

export const useStyles = makeStyles((theme) => ({
  result: () => ({
    position: 'relative',
    margin: [[0, 'auto', 20]],
    padding: [[30, 20, 0]],
    textAlign: 'center',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '50%',
      width: 22,
      height: 22,
      background: `url(${DocumentDisabled}) no-repeat center center`,
      transform: 'translateX(-50%)',
      [theme.breakpoints.up('md')]: {
        left: 0,
        transform: 'none',
      },
    },
    [theme.breakpoints.up('md')]: {
      margin: [[0, 0, 20]],
      padding: [[0, 34]],
      textAlign: 'left',
    },
  }),
  resultTitle: () => ({
    color: theme.palette.common.black50,
  }),
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    height: '100%',
  },
  editInputWrapper: {
    '& input': {
      padding: [[4, 10]],
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.default,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.black75,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.lightblue,
    },
  },
  inputsWrapper: {
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  },
  inputWrapper: {
    width: 'calc(50% - 20px)',
    marginBottom: 20,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
  },
  editableInput: {
    marginBottom: 6,
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    lineHeight: 1.2,
  },
  editLabel: {
    padding: [[4, 10, 0]],
    fontWeight: 'normal',
    color: theme.palette.text.main,
  },
  label: {
    color: theme.palette.text.main,
  },
  buttonWrapper: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% + 30px)',
      margin: [['auto', 0, -20, -15]],
    },
  },
  button: {
    fontSize: 14,
    color: theme.palette.button.document.contrastText,
    backgroundColor: theme.palette.button.document.main,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    '& svg': {
      marginRight: 10,
      fontSize: 17,
    },
  },
  buttonHalf: {
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: 'auto',
    },
  },
}));
