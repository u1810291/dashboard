import React from 'react';
import { Button, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  flowName: {
    flexGrow: 3,
    flexBasis: 270,
    flexShrink: 0,
    marginRight: 12,
  },
  copyLinkContainer: {
    flexGrow: 1,
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  listItemIcon: {
    minWidth: 20,
  },
  redColor: {
    color: theme.palette.common.red,
  },
}));

export const CopyLinkButton = withStyles(() => ({
  root: {
    color: '#3757FF',
    backgroundColor: '#EBEEFF',
    '&:hover': {
      backgroundColor: '#E3E6F7',
    },
  },
}))(Button);

export const MyMenuItem = withStyles(() => ({
  listItemIcon: {
    minWidth: 20,
  },
}))(({ classes, startIcon, label, ...props }) => (
  <MenuItem {...props}>
    <ListItemIcon className={classes.listItemIcon}>
      {startIcon}
    </ListItemIcon>
    <ListItemText>{label}</ListItemText>
  </MenuItem>
));
