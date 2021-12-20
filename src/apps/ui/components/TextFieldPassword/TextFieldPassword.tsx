import React, { useCallback, useState } from 'react';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { QATags } from 'models/QA.model';
import { useStyles } from './TextFieldPassword.styles';

export const TextFieldPassword = React.forwardRef((props: TextFieldProps, ref) => {
  const classes = useStyles();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((prevState) => !prevState);
  }, []);

  return (
    <TextField
      {...props}
      type={isShowPassword ? 'input' : 'password'}
      ref={ref as any}
      InputProps={{
        inputProps: { 'data-qa': QATags.Webhook.Secret },
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              className={classes.showPasswordButton}
              aria-label="toggle password visibility"
              onClick={handleShowPassword}
              edge="end"
            >
              {isShowPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>),
      }}
    />
  );
});
