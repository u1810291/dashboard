import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { bordered?: boolean; filled?: boolean; color: string }>((theme) => ({
  root: ({ bordered, filled, color }) => ({
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
    lineHeight: 1.25,
    border: bordered && `1px solid ${theme.palette.warning.main}`,
    padding: (bordered || filled) && '20px 16px 20px 12px',
    borderRadius: '5px',
    background: filled && color,

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
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
