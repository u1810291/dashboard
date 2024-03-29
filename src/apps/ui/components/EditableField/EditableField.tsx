import { useIntl } from 'react-intl';
import React, { useState, useEffect, useRef, useCallback, Dispatch, SetStateAction } from 'react';
import { TextField, InputAdornment, Box } from '@material-ui/core';
import { PageLoader } from 'apps/layout';
import { validationHandler } from 'lib/validations';
import { SubmitButton, CancelButton, useStyles } from './EditableField.styles';

export function EditableField({
  value,
  enabled,
  setEditable,
  submitEditable,
  cancelEditable,
  validator,
  inProgress = false,
  className,
  ...props
}: {
  value: string;
  enabled: boolean;
  setEditable: Dispatch<SetStateAction<boolean>>;
  submitEditable?: (text: string) => void;
  cancelEditable?: () => void;
  validator?: (text: string) => void;
  inProgress?: boolean;
  className?: string;
}) {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [currentText, setCurrentText] = useState('');
  const inputRef = useRef<HTMLInputElement>();
  const intl = useIntl();

  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setError(null);
    setCurrentText(e.target.value);
  }, []);

  const cancelEditableHandler = useCallback(() => {
    setCurrentText(value);
    setError(null);
    setEditable(false);
    cancelEditable();
  }, [value, cancelEditable, setEditable]);

  const submitEditableHandler = useCallback(async () => {
    const text = currentText.trim();
    try {
      if (text !== value) {
        if (validator) {
          await validator(text);
        }
        if (submitEditable) {
          await submitEditable(text);
        }
      }
      setCurrentText(text);
      setEditable(false);
    } catch (e) {
      validationHandler(e, intl, setError);
    }
  }, [currentText, submitEditable, setEditable, validator, value, intl]);

  function onKeyDownHandler(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      submitEditableHandler();
    }
  }

  const setFocus = useCallback(() => setTimeout(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, 50), [inputRef]);

  function allowEditHandler(e) {
    e.preventDefault();
    setEditable(true);
    setFocus();
  }

  useEffect(() => {
    setCurrentText(value);
  }, [value]);

  useEffect(() => {
    const timeout = setFocus();
    return () => {
      clearTimeout(timeout);
    };
  }, [setFocus, enabled]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      cancelEditableHandler();
    }
  }, [cancelEditableHandler]);

  useEffect(() => {
    if (enabled) {
      window.addEventListener('keyup', handleKeyUp);
    } else {
      window.removeEventListener('keyup', handleKeyUp);
    }
  }, [enabled, handleKeyUp]);

  if (!enabled) {
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
            {inProgress
              ? <PageLoader size={25} />
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
      className={className || classes.editableField}
      {...props}
    />
  );
}
