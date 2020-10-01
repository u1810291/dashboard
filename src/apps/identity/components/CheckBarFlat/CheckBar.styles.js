import { makeStyles, Tooltip, withStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 15,
    backgroundColor: theme.palette.common.white,
    '&:focus': {
      backgroundColor: '#f7f7fa',
    },
  },
  success: {
    borderColor: theme.palette.common.green,
  },
  failure: {
    borderColor: theme.palette.common.red,
  },
  icon: {
    maxWidth: 50,
    maxHeight: 50,
    flexGrow: 0,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  subIcon: {
    maxWidth: 25,
    maxHeight: 25,
    flexGrow: 0,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tooltip: {
    fontSize: 18,
    color: '#bbbbbe',
    '&:hover': {
      color: '#4a4a4a',
    },
  },
  subStatus: {
    display: 'flex',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
  },
}));

export const MyTooltip = withStyles({
  tooltip: {
    padding: 20,
    fontSize: 12,
    lineHeight: '1.3',
    color: '#242424',
    backgroundColor: '#fff',
    boxShadow: '5px 5px 14px rgba(0, 0, 0, 0.15)',
  },
  arrow: {
    color: 'white',
  },
})(Tooltip);
