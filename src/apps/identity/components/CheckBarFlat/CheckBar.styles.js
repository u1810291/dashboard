import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles, Box, Tooltip } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  tooltip: {
    fontSize: 18,
    color: '#bbbbbe',
    '&:hover': {
      color: '#4a4a4a',
    },
  },
  fluid: {
    flexGrow: 1,
  },
}));

export const BoxCheckBarRounded = withStyles((theme) => ({
  root: {
    display: 'flex',
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 15,
    backgroundColor: theme.palette.common.white,
    justifyContent: 'space-between',
    height: '100%',
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
}))(({ classes, status, children }) => (
  <Box className={clsx(classes.root, classes[status])}>
    {children}
  </Box>
));

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
