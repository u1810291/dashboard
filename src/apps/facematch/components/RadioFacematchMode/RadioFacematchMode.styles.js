import React from 'react';
import { Button } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  fluid: {
    flexGrow: 1,
  },
  expandButtonBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
}));

export const ButtonExpand = withStyles(() => ({
  root: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}))(({ classes, expanded, children, ...props }) => (
  <Button classes={classes} disableRipple {...props}>
    {children}
    {expanded ? <ExpandLess /> : <ExpandMore />}
  </Button>
));