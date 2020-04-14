import { useIntl } from 'react-intl';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TextField, InputAdornment, Box } from '@material-ui/core';
import { validationHandler } from 'lib/validations';
import { SubmitButton, CancelButton, Spinner, useStyles } from './EditableField.styles';

export function EditableField({
  value,
  enabled,
  submitEditable,
  cancelEditable,
  validator,
  inProgress = false,
  display,
  ...props
}) {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [allowEdit, setAllowEdit] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const inputRef = useRef();
  const intl = useIntl();

  function onChangeHandler(e) {
    setError(null);
    setCurrentText(e.target.value);
  }

  const cancelEditableHandler = useCallback(() => {
    setCurrentText(value);
    setAllowEdit(false);
    cancelEditable();
  }, [value, cancelEditable]);

  const submitEditableHandler = useCallback(async () => {
    const text = currentText.trim();
    try {
      if (validator) {
        await validator(text);
      }
      if (submitEditable) {
        await submitEditable(text);
      }
      setCurrentText(text);
      setAllowEdit(false);
    } catch (e) {
      validationHandler(e, intl, setError);
    }
  }, [currentText, submitEditable, validator, intl]);

  function onKeyDownHandler(e) {
    if (e.key === 'Enter') {
      submitEditableHandler();
    }
    if (e.key === 'Escape') {
      cancelEditableHandler();
    }
  }

  function allowEditHandler() {
    setAllowEdit(true);
  }

  useEffect(() => {
    setCurrentText(value);
  }, [value]);

  useEffect(() => {
    function setFocus() {
      return inputRef.current && inputRef.current.focus();
    }
    const timeout = setTimeout(() => {
      setFocus();
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [inputRef, enabled]);

  const handleKeyUp = useCallback((e) => {
    switch (e.key) {
      case 'Escape':
        cancelEditableHandler();
        break;
      default:
        break;
    }
  }, [cancelEditableHandler]);

  useEffect(() => {
    if (enabled || allowEdit) {
      window.addEventListener('keyup', handleKeyUp);
    } else {
      window.removeEventListener('keyup', handleKeyUp);
    }
  }, [enabled, allowEdit, handleKeyUp]);

  if (!enabled && !allowEdit) {
    return <Box className={classes.flowName} onDoubleClick={allowEditHandler}>{value}</Box>;
  }

  return (
    <TextField
      id="editable-field"
      variant="outlined"
      value={currentText}
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
      inputRef={inputRef}
      error={!!error}
      helperText={error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            { inProgress
              ? <Spinner size={25} />
              : <SubmitButton onClick={submitEditableHandler} />}
            <CancelButton onClick={cancelEditableHandler} />
          </InputAdornment>
        ),
        classes: {
          root: classes.cssOutlinedInput,
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline,
        },
      }}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{
        autoComplete: 'off',
      }}
      className={classes.editableField}
      {...props}
    />
  );
}
