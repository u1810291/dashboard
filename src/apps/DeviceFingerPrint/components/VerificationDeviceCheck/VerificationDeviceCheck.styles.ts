import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    minHeight: 200,
    height: '100%',
    padding: '0 20px',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
    ...(theme.isDarkMode && ({
      padding: 0,
    })),
  },
  check: {
    marginBottom: 20,
    '&:last-child': {
      marginBottom: 0,
    },
    ...(theme.isDarkMode && ({
      marginBottom: 10,
      padding: '6px 20px 6px 10px',
      borderRadius: 5,
      backgroundColor: theme.palette.foreground.main,
    })),
  },
  labelWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  titleIcon: {
    flexShrink: 0,
    width: 17,
    height: 17,
    marginRight: 23,
  },
  whiteIcon: {
    '& path': {
      ...(theme.isDarkMode && ({ fill: theme.palette.text.main })),
    },
  },
  whitePhoneIcon: {
    '&': {
      ...(theme.isDarkMode && ({ color: theme.palette.text.main })),
    },
  },
  label: {
    color: theme.palette.text.main,
    lineHeight: '1.1',
  },
  value: {
    color: theme.palette.text.secondary,
    lineHeight: '1.1',
    textAlign: 'right',
  },
}));
