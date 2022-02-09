import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { IconButtonProps } from '@material-ui/core/IconButton/IconButton';

export const DeleteIconButton = withStyles((theme) => ({
  root: {
    color: theme.palette.common.red,
    marginRight: 9,
  },
}))((props: IconButtonProps) => (
  <IconButton
    size="small"
    {...props}
  />
));
