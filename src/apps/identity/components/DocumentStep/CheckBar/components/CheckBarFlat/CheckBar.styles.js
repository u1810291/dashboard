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
  tipMessage: {
    padding: [[6, 10]],
    borderRadius: 5,
    marginTop: 15,
  },
  tipMessageSuccess: {
    color: '#2ADA9A',
    backgroundColor: 'rgba(42, 218, 154, 0.1)',
  },
  tipMessageFailure: {
    color: '#ff0000',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
  tipMessageChecking: {
    border: '1px solid #0a0a0a',
  },
}));

export const BoxCheckBarRounded = withStyles((theme) => ({
  root: {
    height: 'auto',
    width: '100%',
    minWidth: 260,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 15,
    backgroundColor: theme.palette.common.white,
    justifyContent: 'space-between',
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
