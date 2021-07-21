import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useStyles } from 'apps/ui/components/TextFieldPassword/TextFieldPassword.styles';
import { TextField } from 'formik-material-ui';
import { QATags } from 'models/QA.model';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export function TextFieldPassword({ field, form, ...props }) {
  const classes = useStyles();
  const { name, value } = field;
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [password, setPassword] = useState(value ?? '');
  const [hideSymbol] = useState('*');
  const [startSelection, setStartSelection] = useState(0);
  const [endSelection, setEndSelection] = useState(0);
  const [savedPosition, setSavedPosition] = useState(0);
  const [isBackspacePressed, setIsBackspacePressed] = useState(false);
  const inputRef = useRef(null);

  const handleSelection = useCallback((event) => {
    setEndSelection(event.target.selectionEnd);
    setStartSelection(event.target.selectionStart);
  }, []);

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((prevState) => !prevState);
  }, []);

  const handleOnKeyDown = useCallback((event) => {
    setIsBackspacePressed([event?.key, event?.code].includes('Backspace'));
  }, []);

  const setFieldValue = useCallback((newValue) => {
    form.setFieldValue(name, newValue);
  }, [form, name]);

  const saveResult = useCallback((newValue, prevState, newInputEndPosition) => {
    const newPosition = isBackspacePressed ? startSelection - 1 : startSelection + 1;
    setSavedPosition(newInputEndPosition && newInputEndPosition > startSelection + 1 ? newInputEndPosition : newPosition);
    setFieldValue(newValue);
    return newValue;
  }, [isBackspacePressed, setFieldValue, startSelection]);

  const inputNewValue = useCallback((newValue, prevState, newInputEndPosition) => {
    const startSlice = prevState.substring(0, isBackspacePressed ? startSelection - 1 : startSelection);
    const endSlice = prevState.substring(endSelection);
    const localResult = `${startSlice}${newValue}${endSlice}`;
    return saveResult(localResult, prevState, newInputEndPosition);
  }, [endSelection, isBackspacePressed, saveResult, startSelection]);

  const handleInputChange = useCallback((event) => {
    const inputValue = event?.target?.value || '';

    setPassword((prevState) => {
      const lengthRemainingString = prevState.substring(0, isBackspacePressed ? startSelection - 1 : startSelection).length + prevState.substring(endSelection).length - startSelection;
      const newInputEndPosition = inputValue.length - lengthRemainingString;
      const newInput = inputValue.substring(startSelection, newInputEndPosition);

      if (!isShowPassword) {
        return inputNewValue(newInput, prevState, newInputEndPosition);
      }

      return saveResult(inputValue, prevState, newInputEndPosition);
    });
  }, [endSelection, inputNewValue, isBackspacePressed, isShowPassword, saveResult, startSelection]);

  const encapsulatedField = {
    ...field,
    value: isShowPassword ? password : hideSymbol.repeat(password?.length || 0),
    onChange: handleInputChange,
  };

  useEffect(() => {
    const input = inputRef?.current?.querySelector('input') || {};
    input.selectionStart = savedPosition;
    input.selectionEnd = savedPosition;
  }, [field.value, savedPosition]);

  return (
    <TextField
      {...props}
      field={encapsulatedField}
      onSelect={handleSelection}
      form={form}
      innerRef={inputRef}
      onKeyDown={handleOnKeyDown}
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
              {isShowPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>),
      }}
    />
  );
}
