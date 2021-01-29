import { Button, makeStyles, withStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    width: '100%',
    boxShadow: 'none',
  },
  inline: {
    width: '50%',
  },
  redText: {
    color: theme.palette.common.red,
  },
  yellowText: {
    color: theme.palette.common.yellow,
  },
  greenText: {
    color: theme.palette.common.green,
  },
  monitoringStatus: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: '-30px',
  },
  iconContainer: {
    width: '25px',
    flex: '0 0 30px',
  },
  icon: {
    width: '100%',
  },
  greenUnderlinedText: {
    color: theme.palette.common.green,
    textDecoration: 'underline',
  },
}));

export const LinkButton = withStyles((theme) => ({
  root: {
    fontSize: 14,
    color: theme.palette.common.lightblue,
    backgroundColor: theme.palette.common.whiteblue,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  endIcon: {
    width: 17,
  },
}))(Button);
