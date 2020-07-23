import React from 'react';
import { Button, MenuItem, Typography, Container } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export const FlowButtonAdd = withStyles(() => ({
  root: {
    flexGrow: 1,
    padding: [[16, 20]],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
}))(({ classes, children, ...props }) => (
  <Container classes={classes}>
    <Button {...props}>
      {children}
    </Button>
  </Container>
));

export const FlowMenuItem = withStyles((theme) => ({
  root: {
    padding: [[16, 20]],
  },
  selected: {
    color: theme.palette.primary.main,
    backgroundColor: [['#EBEEFF'], '!important'],
  },
}))(({ children, ...props }) => (
  <MenuItem {...props}>
    <Typography variant="inherit" noWrap>
      {children}
    </Typography>
  </MenuItem>
));

export const FlowMenuHeader = withStyles(() => ({
  root: {
    padding: [[16, 20]],
    userSelect: 'none',
  },
}))(Typography);

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      maxHeight: 348,
    },
  },
  menuItem: {
    padding: 0,
    maxHeight: 480,
    overflowY: 'auto',
  },
}));
