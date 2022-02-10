import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { SvgIconProps } from '@material-ui/core/SvgIcon/SvgIcon';

export const useStyles = makeStyles((theme) => ({
  uploadDiv: {
    width: 64,
    height: 64,
    border: `1px dashed ${theme.palette.common.lightblue}`,
    boxSizing: 'border-box',
    borderRadius: 4,
    cursor: 'pointer',
  },
  thumbnail: {
    width: 'auto',
    height: 'auto',
    maxWidth: 64,
    maxHeight: 64,
    backgroundSize: 'cover',
  },
  remove: {
    verticalAlign: 'text-bottom',
    color: theme.palette.common.red,
    cursor: 'pointer',
  },
}));

export const AddCircledIcon = withStyles((theme) => ({
  root: {
    color: theme.palette.common.lightblue,
    backgroundColor: theme.palette.common.black7,
    borderRadius: 50,
  },
}))((props: SvgIconProps) => (
  <AddIcon
    fontSize="medium"
    {...props}
  />
));
