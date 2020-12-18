import { Button, makeStyles, withStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
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
    color: '#fe7581',
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
