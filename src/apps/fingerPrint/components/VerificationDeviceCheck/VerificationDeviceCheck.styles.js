import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: () => ({
    width: '100%',
    minHeight: 200,
    height: '100%',
    padding: [[0, 20]],
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
    ...(theme.isDarkMode && ({
      minHeight: 'auto',
      [theme.breakpoints.down('xs')]: {
        padding: [[0, 20]],
      },
    })),
  }),
  check: () => ({
    marginBottom: 20,
    '&:last-child': {
      marginBottom: 0,
    },
    ...(theme.isDarkMode && ({
      marginBottom: 10,
      padding: [[6, 20, 6, 10]],
      borderRadius: 5,
      backgroundColor: theme.palette.foreground.main,
    })),
  }),
  labelWrap: () => ({
    display: 'flex',
    alignItems: 'center',
  }),
  titleIcon: () => ({
    flexShrink: 0,
    width: 17,
    height: 17,
    marginRight: 23,
  }),
  label: () => ({
    color: theme.palette.text.main,
    lineHeight: '1.1',
  }),
  value: () => ({
    color: theme.palette.text.secondary,
    lineHeight: '1.1',
    textAlign: 'right',
  }),
}));
