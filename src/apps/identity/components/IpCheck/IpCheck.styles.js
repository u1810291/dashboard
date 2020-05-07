import React from 'react';
import { makeStyles, withStyles, Chip } from '@material-ui/core';
import { FiAlertCircle } from 'react-icons/fi';

export const useStyles = makeStyles((theme) => ({
  map: {
    padding: 0,
    textAlign: 'right',
    '&>img': {
      borderRadius: 5,
      maxHeight: '100%',
    },
  },
  mapContainer: {
    [theme.breakpoints.down('xs')]: {
      flexShrink: 1,
      flexGrow: 1,
    },
  },
  values: {
    color: '#8392B8',
  },
}));

export const ProxyChip = withStyles((theme) => ({
  root: {
    fontSize: 14,
    color: '#FE7581',
    height: 37,
    border: [[1, 'solid', '#FE7581']],
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
    paddingRight: 34,
  },
}))(({ ...props }) => (
  <Chip
    variant="outlined"
    icon={<FiAlertCircle />}
    {...props}
  />
));
