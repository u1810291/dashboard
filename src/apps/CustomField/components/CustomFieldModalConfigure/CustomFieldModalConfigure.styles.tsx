import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';
import { SvgIconProps } from '@material-ui/core/SvgIcon/SvgIcon';

export const TextFieldInput = withStyles({
  helperText: {
    margin: 0,
  },
})(({ classes, ...props }: TextFieldProps & { classes: {helperText: string}}) => (
  <TextField
    variant="outlined"
    FormHelperTextProps={{
      classes: {
        root: classes.helperText,
      },
    }}
    {...props}
  />
));

export const InfoIcon = withStyles((theme) => ({
  root: {
    color: theme.palette.common.yellow,
    verticalAlign: 'middle',
    marginLeft: 4,
  },
}))((props: SvgIconProps) => (
  <InfoOutlinedIcon
    fontSize="small"
    {...props}
  />
));
