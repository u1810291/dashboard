import React, { useState, useEffect, useRef, useCallback } from 'react';
import Icon from 'assets/icon-editable-input.svg';
import { Box } from '@material-ui/core';
import { useStyles } from './EditableInput.styles';

export function EditableInput({ text, onSubmit }) {
  const [isEditing, setEditing] = useState(false);

  const [inputText, setinputText] = useState(text);

  const inputRef = useRef();
  const classes = useStyles();

  useEffect(() => {
    if (inputRef.current && isEditing === true) {
      inputRef.current.focus();
    }
  }, [isEditing, inputRef]);

  const handleBlur = useCallback(() => {
    if (inputText.length === 0) {
      setinputText(text);
    }
    if (inputText !== text) {
      onSubmit(inputText);
    }
    setEditing(false);
  }, [setinputText, inputText, text, onSubmit, setEditing]);

  const handleKeyDown = useCallback((event) => {
    const { key } = event;
    const submitKeys = ['Tab', 'Enter'];

    if (key === 'Escape') {
      setEditing(false);
      setinputText(text);
    }
    if (submitKeys.indexOf(key) > -1) {
      handleBlur();
    }
  }, [setEditing, setinputText, text, handleBlur]);

  const handleOnChange = useCallback((e) => {
    setinputText(e.target.value);
  }, [setinputText]);

  const handleOnClick = useCallback(() => {
    setEditing(true);
  }, [setEditing]);

  return (
    <Box>
      {isEditing ? (
        <Box
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            className={classes.input}
            onChange={handleOnChange}
          />
        </Box>
      ) : (
        <Box
          onClick={handleOnClick}
          className={classes.nameWrapper}
        >
          <span className={classes.name}>
            {inputText}
          </span>
          <img src={Icon} alt="" />
        </Box>
      )}
    </Box>
  );
}
