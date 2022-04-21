import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    height: '100%',
  },
  inputsWrapper: {
    wordBreak: 'break-word',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  },
  buttonWrapper: {
    [theme.breakpoints.up('xl')]: {
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
  },
  buttonHalf: {
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: 'auto',
    },
  },
  buttonEditIcon: {
    marginRight: 10,
    fontSize: 17,
  },
}));
