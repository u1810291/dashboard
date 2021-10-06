import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { QATags } from 'models/QA.model';
import { useStyles } from './TextFieldPassword.styles';

export function TextFieldPassword({ name, setValue, value, ...props }: {
  name: string;
  value: string;
  setValue: (name: any, value: string, config?: Object) => void;
  [x: string]: any;
}) {
  const HIDE_SYMBOL = '*';
  const classes = useStyles();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>(value ?? '');
  const [startSelection, setStartSelection] = useState<number>(0);
  const [endSelection, setEndSelection] = useState<number>(0);
  const [savedPosition, setSavedPosition] = useState<number>(0);
  const [isBackspacePressed, setIsBackspacePressed] = useState<boolean>(false);
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

  const setFieldValue = useCallback((newValue: string) => {
    setValue(name, newValue);
  }, [setValue, name]);

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

  useEffect(() => {
    const input = inputRef?.current?.querySelector('input') || {};
    input.selectionStart = savedPosition;
    input.selectionEnd = savedPosition;
  }, [savedPosition]);

  return (
    <TextField
      {...props}
      name={name}
      value={isShowPassword ? password : HIDE_SYMBOL.repeat(password?.length || 0)}
      onChange={handleInputChange}
      onSelect={handleSelection}
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
