import { Box, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';

export const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    padding: [[20, 35]],
    backgroundColor: 'rgba(7, 17, 66, 0.8)',
    userSelect: 'none',
  },
  menuItem: {
    padding: 0,
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  playButtonsContainer: {
    display: 'flex',
    height: 120,
    flex: [[0, 1, '289px']],
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  videoFrame: {
    minWidth: 200,
    [theme.breakpoints.up(600)]: {
      minWidth: 600,
    },
    [theme.breakpoints.up(800)]: {
      minWidth: 600,
    },
    [theme.breakpoints.up(1024)]: {
      minWidth: 1024,
    },
  },
}));

export const DemoVideoButton = withStyles(() => ({
  root: {
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.4)',
  },
  label: {
    justifyContent: 'start',
  },
}))(({ children, ...props }) => (
  <Button variant="outlined" fullWidth {...props}>
    <Box fontSize={12} flexGrow={1} textAlign="start">{children}</Box>
  </Button>
));
