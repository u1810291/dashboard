import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { color: string; textColor: string }>(() => ({
  root: ({ color }) => ({
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: color,
    padding: '20px',
    paddingRight: '12px',
    borderRadius: '5px',
  }),
  title: ({ textColor }) => ({
    fontWeight: 'bold',
    color: textColor,
  }),
  subTitle: ({ textColor }) => ({
    color: textColor,
  }),
}));
