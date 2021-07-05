import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { bordered?: boolean }>((theme) => ({
  root: ({ bordered }) => ({
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
    lineHeight: 1.25,
    border: bordered && `1px solid ${theme.palette.warning.main}`,
    padding: bordered && '12px 34px 12px 10px',
    borderRadius: bordered && '5px',

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 'auto',
      textAlign: 'left',
    },
  }),
  content: {
    flexGrow: 1,
    // @ts-ignore
    color: theme.palette.text.main,
  },
  icon: {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 0,
    margin: '0 0 10px',
    [theme.breakpoints.up('md')]: {
      margin: '0 10px 0 0',
    },
  },
}));
