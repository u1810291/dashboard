import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { IconButtonProps } from '@material-ui/core/IconButton/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  root: {
    minHeight: 30,
  },
}));

export const LightblueIconButton = withStyles((theme) => ({
  root: {
    color: theme.palette.common.lightblue,
    marginRight: 10,
    marginLeft: 10,
  },
}))((props: IconButtonProps) => (
  <IconButton
    size="small"
    {...props}
  />
));
