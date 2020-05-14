import { makeStyles, withStyles, Chip } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  proxy: {
    color: '#FE7581',
    border: [[1, 'solid', '#FE7581']],
  },
  noProxy: {
    color: '#5AC794',
    border: [[1, 'solid', '#5AC794']],
  },
}));

export const ProxyChipElement = withStyles((theme) => ({
  root: {
    fontSize: 14,
    height: 37,
    borderRadius: 5,
    [theme.breakpoints.down('xs')]: {
      fontSize: 10,
    },
  },
  outlined: {
    '&>.MuiChip-icon': {
      color: 'inherit',
      marginLeft: 10,
      fontSize: 19,
      strokeWidth: 1.2,
    },
  },
  label: {
    overflow: 'visible',
    paddingRight: 34,
  },
}))(Chip);
